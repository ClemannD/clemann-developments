import {MigrationInterface, QueryRunner} from "typeorm";

export class LeagueNotes1633985746517 implements MigrationInterface {
    name = 'LeagueNotes1633985746517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "week" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "week" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "season" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "season" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "league" ADD "notes" character varying`);
        await queryRunner.query(`ALTER TABLE "player" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "player" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "set" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "set" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "court" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "court" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "set" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "set" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "league" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "season" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "season" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "week" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "week" DROP COLUMN "createdAt"`);
    }

}
