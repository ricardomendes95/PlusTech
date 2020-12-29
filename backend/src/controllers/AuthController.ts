import { Request, Response } from 'express'

class AuthController {
  login(request: Request, response: Response) {
    const { login, password } = request.body

    const user = {
      login: 'admin',
      password: 'admin',
    }

    if (user.login !== login || user.password !== password) {
      return response.status(403).json({
        message: 'E-mail/senha inválido(s)',
      })
    }

    return response.send()
  }
}

export default new AuthController()
