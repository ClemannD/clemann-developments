import {MigrationInterface, QueryRunner} from "typeorm";

export class ScoresSetsSubs1631756971204 implements MigrationInterface {
    name = 'ScoresSetsSubs1631756971204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "score" ("scoreId" uuid NOT NULL DEFAULT uuid_generate_v4(), "setNumber" integer NOT NULL, "score" integer NOT NULL, "playerPlayerId" uuid, CONSTRAINT "PK_8d6f7460ccb0237d589b3bc5fcd" PRIMARY KEY ("scoreId"))`);
        await queryRunner.query(`CREATE TABLE "sub" ("subId" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "PK_484335e2dc697114e870bbdd4a1" PRIMARY KEY ("subId"))`);
        await queryRunner.query(`CREATE TABLE "set" ("setId" uuid NOT NULL DEFAULT uuid_generate_v4(), "setNumber" integer NOT NULL, "team1Score" integer NOT NULL, "team2Score" integer NOT NULL, "team1Player1PlayerId" uuid, "team1Player2PlayerId" uuid, "team2Player1PlayerId" uuid, "team2Player2PlayerId" uuid, "courtCourtId" uuid, CONSTRAINT "PK_0920c1ccf5d023f11bc0015c989" PRIMARY KEY ("setId"))`);
        await queryRunner.query(`ALTER TABLE "player" ADD "playerPosition" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "player" ADD "adjustedTotalScore" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "player" ADD "subSubId" uuid`);
        await queryRunner.query(`ALTER TABLE "week" ALTER COLUMN "playingOnDate" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "week"."playingOnDate" IS NULL`);
        await queryRunner.query(`ALTER TABLE "score" ADD CONSTRAINT "FK_300bb0f82c08a81ae1e15d8efc5" FOREIGN KEY ("playerPlayerId") REFERENCES "player"("playerId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_329495422b1648f0ebd037cec3b" FOREIGN KEY ("subSubId") REFERENCES "sub"("subId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "set" ADD CONSTRAINT "FK_73c385a0c14e0059ba1f8188720" FOREIGN KEY ("team1Player1PlayerId") REFERENCES "player"("playerId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "set" ADD CONSTRAINT "FK_32065d062d7f4a36cef54ae4858" FOREIGN KEY ("team1Player2PlayerId") REFERENCES "player"("playerId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "set" ADD CONSTRAINT "FK_cfa661699bd2f280ffb54518e19" FOREIGN KEY ("team2Player1PlayerId") REFERENCES "player"("playerId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "set" ADD CONSTRAINT "FK_713cfcb1ef607be41ee09b10401" FOREIGN KEY ("team2Player2PlayerId") REFERENCES "player"("playerId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "set" ADD CONSTRAINT "FK_b733497b10a3e946820f6564419" FOREIGN KEY ("courtCourtId") REFERENCES "court"("courtId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "set" DROP CONSTRAINT "FK_b733497b10a3e946820f6564419"`);
        await queryRunner.query(`ALTER TABLE "set" DROP CONSTRAINT "FK_713cfcb1ef607be41ee09b10401"`);
        await queryRunner.query(`ALTER TABLE "set" DROP CONSTRAINT "FK_cfa661699bd2f280ffb54518e19"`);
        await queryRunner.query(`ALTER TABLE "set" DROP CONSTRAINT "FK_32065d062d7f4a36cef54ae4858"`);
        await queryRunner.query(`ALTER TABLE "set" DROP CONSTRAINT "FK_73c385a0c14e0059ba1f8188720"`);
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_329495422b1648f0ebd037cec3b"`);
        await queryRunner.query(`ALTER TABLE "score" DROP CONSTRAINT "FK_300bb0f82c08a81ae1e15d8efc5"`);
        await queryRunner.query(`COMMENT ON COLUMN "week"."playingOnDate" IS NULL`);
        await queryRunner.query(`ALTER TABLE "week" ALTER COLUMN "playingOnDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "subSubId"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "adjustedTotalScore"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "playerPosition"`);
        await queryRunner.query(`DROP TABLE "set"`);
        await queryRunner.query(`DROP TABLE "sub"`);
        await queryRunner.query(`DROP TABLE "score"`);
    }

}
