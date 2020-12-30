/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express'
import { Op, WhereOptions } from 'sequelize'

import { Contributor, Payment } from '../models'
import { ContributorAttributes } from '../models/Contributor'
import { PaymentAttributes } from '../models/Payment'

class PaymentController {
  async index(request: Request, response: Response) {
    const poolId = Number(request.params.poolId) || 0
    const { enabled = 'true', contributor, startDate, endDate } = request.query

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
        include: [
          {
            // @ts-ignore
            model: Contributor,
            as: 'contributor',
            where: contributorWhere,
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
}

export default new PaymentController()
