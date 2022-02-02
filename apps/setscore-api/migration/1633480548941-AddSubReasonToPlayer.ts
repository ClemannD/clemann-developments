import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSubReasonToPlayer1633480548941 implements MigrationInterface {
    name = 'AddSubReasonToPlayer1633480548941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" ADD "subReason" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "subReason"`);
    }

}
