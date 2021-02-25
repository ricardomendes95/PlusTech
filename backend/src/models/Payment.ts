import { Model, DataTypes, Optional } from 'sequelize'
import { AdditionalAid, AdditionalFine } from '.'

import { database } from '../database'

export interface PaymentAttributes {
  id?: number
  poolId?: number
  contributorId?: number
  salary?: number
  leader?: number
  bonus?: number
  goal?: number
  rent?: number
  taxi?: number
  fine?: number
  additionalAids?: AdditionalAid[]
  additionalFines?: AdditionalFine[]
  total?: number
  enabled?: boolean
  createdAt?: Date
}

type PaymentCreationAttributes = Optional<PaymentAttributes, 'id'>

export default class Payment
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes {
  public id!: number

  public poolId!: number

  public contributorId!: number

  public salary!: number

  public leader!: number

  public bonus!: number

  public goal!: number

  public rent!: number

  public taxi!: number

  public fine!: number

  public additionalAids!: AdditionalFine[]

  public additionalFines!: AdditionalFine[]

  public total!: number

  public enabled!: boolean

  public createdAt!: Date

  public readonly updatedAt!: Date
}

const options = {
  sequelize: database,
  underscored: true,
  tableName: 'payments',
}

const dataTypes = {
  poolId: DataTypes.NUMBER,
  contributorId: DataTypes.NUMBER,
  salary: DataTypes.DECIMAL,
  leader: DataTypes.DECIMAL,
  bonus: DataTypes.DECIMAL,
  goal: DataTypes.DECIMAL,
  rent: DataTypes.DECIMAL,
  taxi: DataTypes.DECIMAL,
  fine: DataTypes.DECIMAL,
  total: DataTypes.DECIMAL,
  enabled: DataTypes.BOOLEAN,
  createdAt: DataTypes.DATE,
}

Payment.init(dataTypes, options)
