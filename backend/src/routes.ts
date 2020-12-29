import { Router } from 'express'
import { AuthController, PoolController } from './controllers'

const routes = Router()

/**
 * Auth
 */
routes.post('/login', AuthController.login)

/**
 * Pool
 */
routes.get('/pools', PoolController.index)
routes.post('/pools', PoolController.create)
routes.put('/pools/:id', PoolController.update)

export default routes
