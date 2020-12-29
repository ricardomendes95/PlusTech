import { Router } from 'express'
import {
  AuthController,
  ContributorController,
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

/**
 * contributor
 */
routes.get('/pools/:poolId/contributors', ContributorController.index)
routes.post('/pools/:poolId/contributors', ContributorController.create)
routes.put('/contributors/:id/disable', ContributorController.disable)
routes.put('/contributors/:id/enable', ContributorController.enable)

export default routes
