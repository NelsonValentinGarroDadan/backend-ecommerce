import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1729024710323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE example (id SERIAL PRIMARY KEY, name VARCHAR(255))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE example`);
    }
}
