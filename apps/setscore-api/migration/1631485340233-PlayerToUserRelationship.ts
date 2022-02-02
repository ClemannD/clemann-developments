import {MigrationInterface, QueryRunner} from "typeorm";

export class PlayerToUserRelationship1631485340233 implements MigrationInterface {
    name = 'PlayerToUserRelationship1631485340233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "week" ADD "playingOnDate" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "week" DROP COLUMN "playingOnDate"`);
    }

}
