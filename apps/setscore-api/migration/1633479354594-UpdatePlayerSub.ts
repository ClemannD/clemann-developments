import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePlayerSub1633479354594 implements MigrationInterface {
    name = 'UpdatePlayerSub1633479354594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_329495422b1648f0ebd037cec3b"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "subSubId"`);
        await queryRunner.query(`ALTER TABLE "player" ADD "subUserId" character varying`);
        await queryRunner.query(`ALTER TABLE "player" ADD "subLeagueId" character varying`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_96dce6b1b0b39b515d1f237f890" FOREIGN KEY ("subUserId", "subLeagueId") REFERENCES "user_to_league"("userId","leagueId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_96dce6b1b0b39b515d1f237f890"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "subLeagueId"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "subUserId"`);
        await queryRunner.query(`ALTER TABLE "player" ADD "subSubId" uuid`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_329495422b1648f0ebd037cec3b" FOREIGN KEY ("subSubId") REFERENCES "sub"("subId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
