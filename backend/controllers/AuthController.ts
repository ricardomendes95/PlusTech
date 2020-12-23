import { IpcMainEvent } from 'electron'

export function login(route: string, event: IpcMainEvent, args: any) {
  const login = 'admin'
  const password = 'admin'

  if (args.login !== login || args.password !== password) {
    event.reply(route, {
      success: false,
      error: 'E-mail/senha inválido(s)',
    })
    return
  }

  event.reply(route, { success: true, data: { token: 'token-example' } })
}
