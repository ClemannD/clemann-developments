import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePlayerNullability1632594156671 implements MigrationInterface {
    name = 'UpdatePlayerNullability1632594156671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" ALTER COLUMN "playerPosition" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "player"."playerPosition" IS NULL`);
        await queryRunner.query(`ALTER TABLE "player" ALTER COLUMN "adjustedTotalScore" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "player"."adjustedTotalScore" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "player"."adjustedTotalScore" IS NULL`);
        await queryRunner.query(`ALTER TABLE "player" ALTER COLUMN "adjustedTotalScore" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "player"."playerPosition" IS NULL`);
        await queryRunner.query(`ALTER TABLE "player" ALTER COLUMN "playerPosition" SET NOT NULL`);
    }

}
