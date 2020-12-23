import { ipcMain } from 'electron'

import { AuthController, PoolController } from './controllers'

export function routes() {
  /**
   * Auth
   */
  ipcMain.on('login', (event, args) =>
    AuthController.login('login', event, args),
  )

  /**
   * Pool
   */
  ipcMain.on('pool-create', (event, args) =>
    PoolController.create('pool-create', event, args),
  )
}
