import { Request, Response } from 'express'
import { Op, WhereOptions } from 'sequelize'

import { Contributor } from '../models'
import { ContributorAttributes } from '../models/Contributor'

class ContributorController {
  async index(request: Request, response: Response) {
    const { enabled, name, startDate, endDate } = request.query

    try {
      const attributes = ['id', 'name', 'admissionDate']
      const where: WhereOptions<ContributorAttributes> = {
        poolId: Number(request.params.poolId) || 0,
        enabled: enabled === 'true',
      }

      if (name) {
        const where2 = {
          [Op.or]: [
            { id: Number(name) || 0 },
            { name: { [Op.like]: `%${name}%` } },
          ],
        }
        Object.assign(where, where2)
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

  async findByPK(request: Request, response: Response) {
    try {
      const attributes = [
        'id',
        'name',
        'admissionDate',
        'wallet',
        'poolId',
        'email',
      ]

      const pools = await Contributor.findByPk(request.params.id, {
        attributes,
      })

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

  async update(request: Request, response: Response) {
    const { poolId, name, admissionDate, email, wallet, enabled } = request.body

    const id = request.params.id

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
      const contributor = await Contributor.update(
        {
          poolId,
          name,
          admissionDate,
          email,
          wallet,
          enabled,
        },
        { where: { id } },
      )

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
