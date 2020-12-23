import './database/connection'
import { routes } from './routes'

/**
 *
 * Start Backend Application
 *
 */
export function start() {
  /** Starting Application Routes */
  routes()
}
