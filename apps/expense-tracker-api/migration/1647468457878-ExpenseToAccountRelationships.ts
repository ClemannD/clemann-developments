import {MigrationInterface, QueryRunner} from "typeorm";

export class ExpenseToAccountRelationships1647468457878 implements MigrationInterface {
    name = 'ExpenseToAccountRelationships1647468457878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense" ADD "accountAccountId" uuid`);
        await queryRunner.query(`ALTER TABLE "recurring_expense" ADD "accountAccountId" uuid`);
        await queryRunner.query(`ALTER TABLE "expense" ADD CONSTRAINT "FK_38d145016eb876181b03f9f9fab" FOREIGN KEY ("accountAccountId") REFERENCES "account"("accountId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recurring_expense" ADD CONSTRAINT "FK_bad56b71a669846995dba02fbd0" FOREIGN KEY ("accountAccountId") REFERENCES "account"("accountId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurring_expense" DROP CONSTRAINT "FK_bad56b71a669846995dba02fbd0"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP CONSTRAINT "FK_38d145016eb876181b03f9f9fab"`);
        await queryRunner.query(`ALTER TABLE "recurring_expense" DROP COLUMN "accountAccountId"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP COLUMN "accountAccountId"`);
    }

}
