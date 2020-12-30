import { Request, Response } from 'express'
import { Op, WhereOptions } from 'sequelize'

import { Contributor } from '../models'
import { ContributorAttributes } from '../models/Contributor'

class ContributorController {
  async index(request: Request, response: Response) {
    const { enabled, name, startDate, endDate } = request.query
    console.log(enabled, name, startDate, endDate)

    try {
      const attributes = ['id', 'name', 'admissionDate']
      const where: WhereOptions<ContributorAttributes> = {
        poolId: Number(request.params.poolId) || 0,
        enabled: enabled === 'true',
      }

      if (name) {
        where.name = { [Op.like]: `%${name}%` }
      }

      if (startDate && endDate) {
        const start = new Date(startDate.toString())
        const end = new Date(endDate.toString())

        where.admissionDate = { [Op.between]: [start, end] }
      }

      const pools = await Contributor.findAll({ where, attributes })

      return response.json(pools)
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  async create(request: Request, response: Response) {
    const { poolId, name, admissionDate, email, wallet, enabled } = request.body

    if (!name || !admissionDate || !poolId) {
      return response.status(400).json({
        error: 'Campos incompletos',
      })
    }

    if (wallet && wallet.length > 50) {
      return response.status(400).json({
        error: 'Carteira Não pode ter mais que 50 caracters',
      })
    }

    try {
      const contributor = await Contributor.create({
        poolId,
        name,
        admissionDate,
        email,
        wallet,
        enabled,
      })

      return response.status(201).json(contributor)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ error })
    }
  }

  async disable(request: Request, response: Response) {
    try {
      const contributor = await Contributor.findByPk(Number(request.params.id))

      if (!contributor) {
        return response.status(404).json({
          error: 'Colaborador não encontrado',
        })
      }

      contributor.enabled = false
      await contributor.save()

      return response.send()
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  async enable(request: Request, response: Response) {
    try {
      const contributor = await Contributor.findByPk(Number(request.params.id))

      if (!contributor) {
        return response.status(404).json({
          error: 'Colaborador não encontrado',
        })
      }

      contributor.enabled = true
      await contributor.save()

      return response.send()
    } catch (error) {
      return response.status(500).json({ error })
    }
  }
}

export default new ContributorController()
