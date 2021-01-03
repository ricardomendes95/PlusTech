/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express'
import { Op, WhereOptions } from 'sequelize'

import { Contributor, Payment } from '../models'
import { ContributorAttributes } from '../models/Contributor'
import { PaymentAttributes } from '../models/Payment'

class PaymentController {
  private attributes: string[]
  private contributorAttributes: string[]

  constructor() {
    this.attributes = [
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

    this.contributorAttributes = [
      'id',
      'name',
      'admissionDate',
      'wallet',
      'poolId',
      'email',
      'enabled',
    ]
  }

  index = async (request: Request, response: Response) => {
    const poolId = Number(request.params.poolId) || 0
    const {
      enabled = 'true',
      orderBy = '0',
      contributor,
      startDate,
      endDate,
    } = request.query

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
        attributes: this.attributes,
        order: [['createdAt', orderBy.toString() === '0' ? 'DESC' : 'ASC']],
        include: [
          {
            // @ts-ignore
            model: Contributor,
            as: 'contributor',
            attributes: this.contributorAttributes,
            where: contributorWhere,
          },
        ],
      })

      return response.json(payments)
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  findOne = async (request: Request, response: Response) => {
    try {
      const payments = await Payment.findByPk(request.params.id, {
        attributes: this.attributes,
        include: [
          {
            // @ts-ignore
            model: Contributor,
            attributes: this.contributorAttributes,
            as: 'contributor',
          },
        ],
      })

      return response.json(payments)
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  create = async (request: Request, response: Response) => {
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

      const result = await Payment.findByPk(payment.id, {
        attributes: this.attributes,
        include: [
          {
            // @ts-ignore
            model: Contributor,
            attributes: this.contributorAttributes,
            as: 'contributor',
          },
        ],
      })

      return response.status(201).json(result)
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  update = async (request: Request, response: Response) => {
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
      const payment = await Payment.findByPk(id, {
        attributes: this.attributes,
      })

      if (!payment) {
        return response.status(404).json({
          error: 'Pagamento nao encontrado',
        })
      }

      await Payment.update(
        {
          contributorId,
          salary,
          leader,
          bonus,
          goal,
          rent,
          taxi,
          fine,
          total,
          enabled: payment.enabled,
        },
        { where: { id } },
      )

      return response.send()
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  disable = async (request: Request, response: Response) => {
    const { id } = request.params

    try {
      const payment = await Payment.findByPk(id, {
        attributes: this.attributes,
      })

      if (!payment) {
        return response.status(404).json({
          error: 'Pagamento não encontrado',
        })
      }
      await Payment.update(
        {
          contributorId: payment.contributorId,
          salary: payment.salary,
          leader: payment.leader,
          bonus: payment.bonus,
          goal: payment.goal,
          rent: payment.rent,
          taxi: payment.taxi,
          fine: payment.fine,
          total: payment.total,
          enabled: false,
        },
        { where: { id } },
      )

      return response.send()
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  enable = async (request: Request, response: Response) => {
    const { id } = request.params

    try {
      const payment = await Payment.findByPk(id, {
        attributes: this.attributes,
      })

      if (!payment) {
        return response.status(404).json({
          error: 'Pagamento não encontrado',
        })
      }

      await Payment.update(
        {
          contributorId: payment.contributorId,
          salary: payment.salary,
          leader: payment.leader,
          bonus: payment.bonus,
          goal: payment.goal,
          rent: payment.rent,
          taxi: payment.taxi,
          fine: payment.fine,
          total: payment.total,
          enabled: true,
        },
        { where: { id } },
      )

      return response.send()
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  latest = async (request: Request, response: Response) => {
    const contributorId = Number(request.params.contributorId) || 0

    try {
      const payment = await Payment.findOne({
        attributes: this.attributes,
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
