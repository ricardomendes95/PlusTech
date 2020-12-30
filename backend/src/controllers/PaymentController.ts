import { Request, Response } from 'express'
import { Payment } from '../models'

class PaymentController {
  async index(request: Request, response: Response) {
    try {
      const { poolId } = request.params

      const payments = await Payment.findAll({ where: { poolId } })

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
      console.log(error)
      return response.status(500).json({ error })
    }
  }
}

export default new PaymentController()
