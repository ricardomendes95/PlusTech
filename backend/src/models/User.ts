import { Model, DataTypes, Optional } from 'sequelize'

import { database } from '../database'

export interface UserAttributes {
  id?: number
  login?: string
  password?: string
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

export default class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number

  public login!: string

  public password!: string

  public readonly createdAt!: Date

  public readonly updatedAt!: Date
}

const options = {
  sequelize: database,
  underscored: true,
  tableName: 'users',
}

const dataTypes = {
  login: DataTypes.STRING,
  password: DataTypes.STRING,
}

User.init(dataTypes, options)
