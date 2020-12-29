import { Request, Response } from 'express'
import { FindOptions } from 'sequelize/types'
import { Contributor } from '../models'

class ContributorController {
  async index(request: Request, response: Response) {
    try {
      const options: FindOptions<Contributor> = {
        where: {
          poolId: Number(request.params.poolId) || 0,
        },
      }
      const pools = await Contributor.findAll(options)

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

    if (wallet.length > 50) {
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
