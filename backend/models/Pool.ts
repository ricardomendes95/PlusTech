import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('pools')
export default class Pool {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column()
  name!: string
}
