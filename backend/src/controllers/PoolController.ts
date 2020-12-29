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
      console.log(name)

      const pool = await Pool.create({ name })

      return response.status(201).json(pool)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ error })
    }
  }
}

export default new PoolController()
