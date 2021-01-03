import { Request, Response } from 'express'
import { Pool } from '../models'

class PoolController {
  async index(request: Request, response: Response) {
    try {
      const pools = await Pool.findAll({ attributes: ['id', 'name'] })

      return response.json(pools)
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  async create(request: Request, response: Response) {
    const { name } = request.body

    if (!name) {
      return response.json({
        error: 'Campos incompletos',
      })
    }

    try {
      const pool = await Pool.create({ name })

      const result = await Pool.findByPk(pool.id, {
        attributes: ['id', 'name'],
      })

      return response.status(201).json(result)
    } catch (error) {
      return response.status(500).json({ error })
    }
  }

  async update(request: Request, response: Response) {
    const { name } = request.body
    const id = Number(request.params.id)

    if (!name) {
      return response.json({
        error: 'Campos incompletos',
      })
    }

    try {
      const pool = await Pool.findByPk(id, {
        attributes: ['id', 'name'],
      })

      if (!pool) {
        return response.status(404).json({
          error: 'Pool nao encontrada',
        })
      }

      await Pool.update({ name }, { where: { id } })

      return response.send()
    } catch (error) {
      return response.status(500).json({ error })
    }
  }
}

export default new PoolController()
