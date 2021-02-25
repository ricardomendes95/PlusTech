import { Model, DataTypes, Optional } from 'sequelize'

import { database } from '../database'

export interface AdditionalFineAttributes {
  id?: number
  paymentId?: number
  title?: string
  value?: number
  createdAt?: Date
}

type AdditionalFineCreationAttributes = Optional<AdditionalFineAttributes, 'id'>

export default class AdditionalFine
  extends Model<AdditionalFineAttributes, AdditionalFineCreationAttributes>
  implements AdditionalFineAttributes {
  public id!: number

  public paymentId!: number

  public title!: string

  public value!: number

  public createdAt!: Date

  public readonly updatedAt!: Date
}

const options = {
  sequelize: database,
  underscored: true,
  tableName: 'additional_fines',
}

const dataTypes = {
  paymentId: DataTypes.NUMBER,
  title: DataTypes.STRING,
  value: DataTypes.DECIMAL,
  createdAt: DataTypes.DATE,
}

AdditionalFine.init(dataTypes, options)
