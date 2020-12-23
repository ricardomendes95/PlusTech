import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('pools')
export default class Pool {
  @PrimaryGeneratedColumn('increment')
  id: number | undefined

  @Column('text')
  name: string | undefined
}
