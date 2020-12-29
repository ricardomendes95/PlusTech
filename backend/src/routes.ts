import { Router } from 'express'
import {
  AuthController,
  PaymentController,
  PoolController,
} from './controllers'

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

/**
 * Payment
 */
routes.get('/pools/:poolId/payments', PaymentController.index)
routes.post('/pools/:poolId/payments', PaymentController.create)

export default routes
