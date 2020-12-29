import { Request, Response } from 'express'
import { Pool } from '../models'

class PoolController {
  async index(request: Request, response: Response) {
    try {
      const pools = await Pool.findAll()

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

      return response.status(201).json(pool)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ error })
    }
  }

  async update(request: Request, response: Response) {
    const { name } = request.body

    if (!name) {
      return response.json({
        error: 'Campos incompletos',
      })
    }

    try {
      const pool = await Pool.findByPk(request.params.id)

      if (!pool) {
        return response.status(404).json({
          error: 'Pool nao encontrada',
        })
      }

      pool.name = name

      await pool.save()

      return response.send()
    } catch (error) {
      return response.status(500).json({ error })
    }
  }
}

export default new PoolController()
