import { Model, DataTypes, Optional } from 'sequelize'

import { database } from '../database'

export interface PoolAttributes {
  id?: number
  name?: string
}

type PoolCreationAttributes = Optional<PoolAttributes, 'id'>

export default class Pool
  extends Model<PoolAttributes, PoolCreationAttributes>
  implements PoolAttributes {
  public id!: number

  public name!: string

  public readonly createdAt!: Date

  public readonly updatedAt!: Date
}

const options = {
  sequelize: database,
  underscored: true,
  tableName: 'pools',
}

const dataTypes = {
  name: DataTypes.STRING,
}

Pool.init(dataTypes, options)
