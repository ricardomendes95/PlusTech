import { Request, Response } from 'express'
import { User } from '../models'
import * as BCrypt from '../utils/bcrypt'

class AuthController {
  login = async (request: Request, response: Response) => {
    const { login, password } = request.body

    try {
      if (!login || !password) {
        return response.status(400).json({
          message: 'Campos incompletos',
        })
      }

      const user = await User.findOne({ where: { login } })

      if (!user) {
        return response.status(404).json({
          message: 'E-mail/senha inválido(s)',
        })
      }

      const comparePassword = await BCrypt.compare(password, user.password)

      if (!comparePassword) {
        return response.status(403).json({
          message: 'E-mail/senha inválido(s)',
        })
      }

      return response.send()
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  update = async (request: Request, response: Response) => {
    const { oldLogin, newLogin, oldPassword, newPassword } = request.body

    if (!oldLogin || !newLogin || !oldPassword || !newPassword) {
      return response.status(400).json({
        message: 'Campos incompletos',
      })
    }

    try {
      const user = await User.findOne({ where: { login: oldLogin } })

      if (!user) {
        return response.status(404).json({
          error: `Usuario com login ${oldLogin} nao encontrado`,
        })
      }

      const comparePassword = await BCrypt.compare(oldPassword, user.password)

      if (!comparePassword) {
        return response.status(403).json({
          error: 'Senha antiga inválida',
        })
      }

      const password = await BCrypt.hash(newPassword)

      await User.update(
        {
          login: newLogin,
          password,
        },
        {
          where: { login: oldLogin },
        },
      )

      return response.json({ success: 'Login e senha alterados com sucesso' })
    } catch (error) {
      return response.status(500).json(error)
    }
  }
}

export default new AuthController()
