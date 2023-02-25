import { MigrationInterface, QueryRunner } from "typeorm";

export class SyncSchema1677293251153 implements MigrationInterface {
    name = 'SyncSchema1677293251153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" ADD "descrption" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "descrption"`);
    }

}
