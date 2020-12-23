import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createPools1608695060264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pools',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isGenerated: true,
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            type: 'varchar',
            name: 'name',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pools')
  }
}
