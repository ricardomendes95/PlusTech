import { ipcMain } from 'electron'

import { AuthController } from './controllers'

export function routes() {
  /**
   * Auth
   */
  ipcMain.on('login', (event, args) =>
    AuthController.login('login', event, args),
  )
}
