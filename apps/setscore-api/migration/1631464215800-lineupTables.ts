import { MigrationInterface, QueryRunner } from 'typeorm';

export class lineupTables1631464215800 implements MigrationInterface {
    name = 'lineupTables1631464215800';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "week" ("weekId" uuid NOT NULL DEFAULT uuid_generate_v4(), "weekNumber" integer NOT NULL, "isCurrentWeek" boolean NOT NULL DEFAULT false, "seasonSeasonId" uuid, CONSTRAINT "PK_cd6a4f350c7b5dcf3d16df04875" PRIMARY KEY ("weekId"))`
        );
        await queryRunner.query(
            `CREATE TABLE "player" ("playerId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userUserId" uuid, "courtCourtId" uuid, CONSTRAINT "PK_ee365af3f201a00d9a917bc45b0" PRIMARY KEY ("playerId"))`
        );
        await queryRunner.query(
            `CREATE TABLE "court" ("courtId" uuid NOT NULL DEFAULT uuid_generate_v4(), "courtNumber" integer NOT NULL, "courtPosition" integer NOT NULL, "weekWeekId" uuid, CONSTRAINT "PK_de0f5d9fd8114033d7466081853" PRIMARY KEY ("courtId"))`
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "season"."seasonNumber" IS NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "season" DROP CONSTRAINT "UQ_9914547481a3c9c84126118b4ab"`
        );
        await queryRunner.query(
            `ALTER TABLE "week" ADD CONSTRAINT "FK_2108d7af8a8cf810f5d10b4d67c" FOREIGN KEY ("seasonSeasonId") REFERENCES "season"("seasonId") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "player" ADD CONSTRAINT "FK_2b8a672d52e840e6c4e3bf79f58" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "player" ADD CONSTRAINT "FK_58efa9a8b61fb2aa7ccc46a4d12" FOREIGN KEY ("courtCourtId") REFERENCES "court"("courtId") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "court" ADD CONSTRAINT "FK_e0f80aa68e92be973c2aee90dab" FOREIGN KEY ("weekWeekId") REFERENCES "week"("weekId") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "court" DROP CONSTRAINT "FK_e0f80aa68e92be973c2aee90dab"`
        );
        await queryRunner.query(
            `ALTER TABLE "player" DROP CONSTRAINT "FK_58efa9a8b61fb2aa7ccc46a4d12"`
        );
        await queryRunner.query(
            `ALTER TABLE "player" DROP CONSTRAINT "FK_2b8a672d52e840e6c4e3bf79f58"`
        );
        await queryRunner.query(
            `ALTER TABLE "week" DROP CONSTRAINT "FK_2108d7af8a8cf810f5d10b4d67c"`
        );
        await queryRunner.query(
            `ALTER TABLE "season" ADD CONSTRAINT "UQ_9914547481a3c9c84126118b4ab" UNIQUE ("seasonNumber")`
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "season"."seasonNumber" IS NULL`
        );
        await queryRunner.query(`DROP TABLE "court"`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`DROP TABLE "week"`);
    }
}
