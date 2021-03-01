import { Request, Response } from 'express'
import { Op, WhereOptions } from 'sequelize'

import { Contributor, Payment } from '../models'
import { ContributorAttributes } from '../models/Contributor'

class ContributorController {
  private attributes: string[]

  constructor() {
    this.attributes = [
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
    const { enabled, orderBy = '0', name, startDate, endDate } = request.query

    try {
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

      const pools = await Contributor.findAll({
        where,
        attributes: this.attributes,
        order: [['createdAt', orderBy.toString() === '0' ? 'DESC' : 'ASC']],
      })

      return response.json(pools)
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  findByPK = async (request: Request, response: Response) => {
    try {
      const contributor = await Contributor.findByPk(request.params.id, {
        attributes: this.attributes,
      })

      return response.json(contributor)
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  create = async (request: Request, response: Response) => {
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

      const result = await Contributor.findByPk(contributor.id, {
        attributes: this.attributes,
      })

      return response.status(201).json(result)
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  update = async (request: Request, response: Response) => {
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
      // const idPoolPrevious = await Contributor.findByPk(request.params.id, {
      //   attributes: ['poolId'],
      // })

      await Contributor.update(
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

      await Payment.update(
        {
          poolId,
        },
        {
          where: { contributorId: id },
        },
      )

      return response.send()
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  disable = async (request: Request, response: Response) => {
    const id = Number(request.params.id)
    try {
      const contributor = await Contributor.findByPk(id, {
        attributes: this.attributes,
      })

      if (!contributor) {
        return response.status(404).json({
          error: 'Colaborador não encontrado',
        })
      }
      await Contributor.update(
        {
          enabled: false,
        },
        { where: { id } },
      )

      return response.send()
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  enable = async (request: Request, response: Response) => {
    const id = Number(request.params.id)
    try {
      const contributor = await Contributor.findByPk(id, {
        attributes: this.attributes,
      })

      if (!contributor) {
        return response.status(404).json({
          error: 'Colaborador não encontrado',
        })
      }

      await Contributor.update(
        {
          enabled: true,
        },
        { where: { id } },
      )

      return response.send()
    } catch (error) {
      return response.status(500).json({ error })
    }
  }
}

export default new ContributorController()
