import { Model, DataTypes, Optional } from 'sequelize'

import { database } from '../database'

export interface AdditionalAidAttributes {
  id?: number
  paymentId?: number
  title?: string
  value?: number
  createdAt?: Date
}

type AdditionalAidCreationAttributes = Optional<AdditionalAidAttributes, 'id'>

export default class AdditionalAid
  extends Model<AdditionalAidAttributes, AdditionalAidCreationAttributes>
  implements AdditionalAidAttributes {
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
  tableName: 'additional_aids',
}

const dataTypes = {
  paymentId: DataTypes.NUMBER,
  title: DataTypes.STRING,
  value: DataTypes.DECIMAL,
  createdAt: DataTypes.DATE,
}

AdditionalAid.init(dataTypes, options)
