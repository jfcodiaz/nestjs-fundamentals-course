import { MigrationInterface, QueryRunner } from "typeorm";

export class CoffeeRefactor1677292486895 implements MigrationInterface {
    name = 'CoffeeRefactor1677292486895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`);
    }

}
