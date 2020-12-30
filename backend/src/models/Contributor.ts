import { Model, DataTypes, Optional } from 'sequelize'

import { database } from '../database'

export interface ContributorAttributes {
  id?: number
  poolId?: number
  name?: string
  admissionDate?: Date
  email?: string
  wallet?: string
  enabled?: boolean
}

type ContributorCreationAttributes = Optional<ContributorAttributes, 'id'>

export default class Contributor
  extends Model<ContributorAttributes, ContributorCreationAttributes>
  implements ContributorAttributes {
  public id!: number

  public name!: string

  public poolId!: number

  public admissionDate!: Date

  public email!: string

  public wallet!: string

  public enabled!: boolean

  public readonly createdAt!: Date

  public readonly updatedAt!: Date
}

const options = {
  sequelize: database,
  underscored: true,
  tableName: 'contributors',
}

const dataTypes = {
  poolId: DataTypes.NUMBER,
  name: DataTypes.STRING,
  admissionDate: DataTypes.DATE,
  email: DataTypes.STRING,
  wallet: DataTypes.STRING,
  enabled: DataTypes.BOOLEAN,
}

Contributor.init(dataTypes, options)
