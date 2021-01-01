/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express'
import { Op, WhereOptions } from 'sequelize'

import { Contributor, Payment } from '../models'
import { ContributorAttributes } from '../models/Contributor'
import { PaymentAttributes } from '../models/Payment'

class PaymentController {
  async index(request: Request, response: Response) {
    const poolId = Number(request.params.poolId) || 0
    const {
      enabled = 'true',
      orderBy = '0',
      contributor,
      startDate,
      endDate,
    } = request.query

    const attributes = [
      'id',
      'poolId',
      'contributorId',
      'salary',
      'leader',
      'bonus',
      'goal',
      'rent',
      'taxi',
      'fine',
      'total',
      'enabled',
      'createdAt',
    ]

    const attributesContributor = [
      'id',
      'name',
      'admissionDate',
      'wallet',
      'poolId',
      'email',
    ]

    const where: WhereOptions<PaymentAttributes> = {
      poolId,
      enabled: enabled === 'true',
    }
    let contributorWhere: WhereOptions<ContributorAttributes> = {}

    if (contributor) {
      contributorWhere = {
        [Op.or]: [
          { id: Number(contributor) || 0 },
          { name: { [Op.like]: `%${contributor}%` } },
        ],
      }
    }

    if (startDate && endDate) {
      const start = new Date(startDate.toString())
      const end = new Date(endDate.toString())

      where.createdAt = { [Op.between]: [start, end] }
    }

    try {
      const payments = await Payment.findAll({
        where,
        attributes,
        order: [['createdAt', orderBy.toString() === '0' ? 'DESC' : 'ASC']],
        include: [
          {
            // @ts-ignore
            model: Contributor,
            as: 'contributor',
            attributes: attributesContributor,
            where: contributorWhere,
          },
        ],
      })

      return response.json(payments)
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  async findOne(request: Request, response: Response) {
    // const id = Number(request.params.id) || 0
    const attributes = [
      'id',
      'poolId',
      'contributorId',
      'salary',
      'leader',
      'bonus',
      'goal',
      'rent',
      'taxi',
      'fine',
      'total',
      'enabled',
      'createdAt',
    ]

    const attributesContributor = [
      'id',
      'name',
      'admissionDate',
      'wallet',
      'poolId',
      'email',
    ]

    try {
      const payments = await Payment.findByPk(request.params.id, {
        attributes,
        include: [
          {
            // @ts-ignore
            model: Contributor,
            attributes: attributesContributor,
            as: 'contributor',
          },
        ],
      })

      return response.json(payments)
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  async create(request: Request, response: Response) {
    const {
      contributorId,
      salary = 0.0,
      leader = 0.0,
      bonus = 0.0,
      goal = 0.0,
      rent = 0.0,
      taxi = 0.0,
      fine = 0.0,
      total = 0.0,
      enabled = true,
    } = request.body

    const poolId = Number(request.params.poolId)

    if (!contributorId) {
      return response.status(400).json({
        error: 'Campos incompletos',
      })
    }

    try {
      const payment = await Payment.create({
        poolId,
        contributorId,
        salary,
        leader,
        bonus,
        goal,
        rent,
        taxi,
        fine,
        total,
        enabled,
      })

      return response.status(201).json(payment)
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params
    const {
      contributorId,
      salary = 0.0,
      leader = 0.0,
      bonus = 0.0,
      goal = 0.0,
      rent = 0.0,
      taxi = 0.0,
      fine = 0.0,
      total = 0.0,
    } = request.body

    if (!contributorId) {
      return response.status(400).json({
        error: 'Campos incompletos',
      })
    }

    try {
      const payment = await Payment.findByPk(id)

      if (!payment) {
        return response.status(404).json({
          error: 'Pagamento nao encontrado',
        })
      }

      payment.contributorId = contributorId
      payment.salary = salary
      payment.leader = leader
      payment.bonus = bonus
      payment.goal = goal
      payment.rent = rent
      payment.taxi = taxi
      payment.fine = fine
      payment.total = total

      await payment.save()

      return response.send()
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  async disable(request: Request, response: Response) {
    const { id } = request.params

    try {
      const payment = await Payment.findByPk(id)

      if (!payment) {
        return response.status(404).json({
          error: 'Pagamento não encontrado',
        })
      }

      payment.enabled = false

      await payment.save()

      return response.send()
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  async enable(request: Request, response: Response) {
    const { id } = request.params

    try {
      const payment = await Payment.findByPk(id)

      if (!payment) {
        return response.status(404).json({
          error: 'Pagamento não encontrado',
        })
      }

      payment.enabled = true

      await payment.save()

      return response.send()
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  async latest(request: Request, response: Response) {
    const contributorId = Number(request.params.contributorId) || 0

    try {
      const payment = await Payment.findOne({
        where: {
          contributorId,
          enabled: true,
        },
        order: [['createdAt', 'DESC']],
        limit: 1,
      })

      if (!payment) {
        return response.status(404).json({
          error: 'Nenhum pagamento encontrado',
        })
      }

      return response.json(payment)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
}

export default new PaymentController()
