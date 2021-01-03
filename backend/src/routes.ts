import { Router } from 'express'
import {
  AuthController,
  PaymentController,
  ContributorController,
  PoolController,
} from './controllers'

const routes = Router()

/**
 * Auth
 */
routes.post('/login', AuthController.login)
routes.put('/users', AuthController.update)
routes.get('/users', AuthController.show)

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
routes.get('/payments/:id', PaymentController.findOne)
routes.post('/pools/:poolId/payments', PaymentController.create)
routes.put('/payments/:id/disable', PaymentController.disable)
routes.put('/payments/:id/enable', PaymentController.enable)
routes.put('/payments/:id', PaymentController.update)

/*
 * contributor
 */
routes.get('/pools/:poolId/contributors', ContributorController.index)
routes.get('/contributors/:id', ContributorController.findByPK)
routes.post('/pools/:poolId/contributors', ContributorController.create)
routes.put('/contributors/:id/disable', ContributorController.disable)
routes.put('/contributors/:id/enable', ContributorController.enable)
routes.put('/contributors/:id', ContributorController.update)
routes.get(
  '/contributors/:contributorId/payments/latest',
  PaymentController.latest,
)
export default routes
