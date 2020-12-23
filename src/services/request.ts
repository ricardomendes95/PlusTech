import { ipcRenderer } from 'electron'

export function request<Request, Response>(
  route: string,
  data: Request,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(route, data)

    ipcRenderer.on(route, (event, args) => {
      if (args.success) {
        resolve(args.data)
      } else {
        reject(args.error)
      }
    })
  })
}
