import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMonthEntity1647468766912 implements MigrationInterface {
    name = 'AddMonthEntity1647468766912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense" DROP CONSTRAINT "FK_38d145016eb876181b03f9f9fab"`);
        await queryRunner.query(`CREATE TABLE "month" ("monthId" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" integer NOT NULL, "month" integer NOT NULL, "accountAccountId" uuid, CONSTRAINT "PK_a19c4775844152e61960845db0f" PRIMARY KEY ("monthId"))`);
        await queryRunner.query(`ALTER TABLE "expense" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP COLUMN "month"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP COLUMN "accountAccountId"`);
        await queryRunner.query(`ALTER TABLE "expense" ADD "isRecurring" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "expense" ADD "monthMonthId" uuid`);
        await queryRunner.query(`ALTER TABLE "expense" ADD CONSTRAINT "FK_b8ae07d8611c267f29608336603" FOREIGN KEY ("monthMonthId") REFERENCES "month"("monthId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "month" ADD CONSTRAINT "FK_26c633d02763ab97bbe99df6510" FOREIGN KEY ("accountAccountId") REFERENCES "account"("accountId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "month" DROP CONSTRAINT "FK_26c633d02763ab97bbe99df6510"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP CONSTRAINT "FK_b8ae07d8611c267f29608336603"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP COLUMN "monthMonthId"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP COLUMN "isRecurring"`);
        await queryRunner.query(`ALTER TABLE "expense" ADD "accountAccountId" uuid`);
        await queryRunner.query(`ALTER TABLE "expense" ADD "month" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "expense" ADD "year" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "month"`);
        await queryRunner.query(`ALTER TABLE "expense" ADD CONSTRAINT "FK_38d145016eb876181b03f9f9fab" FOREIGN KEY ("accountAccountId") REFERENCES "account"("accountId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
