import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTagsJoinTable1647481364965 implements MigrationInterface {
    name = 'AddTagsJoinTable1647481364965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense_tags_tag" ("expenseExpenseId" uuid NOT NULL, "tagTagId" uuid NOT NULL, CONSTRAINT "PK_1b2f564ea85bc415eabf9e946f4" PRIMARY KEY ("expenseExpenseId", "tagTagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aee6627ef164cbc98d6de3853b" ON "expense_tags_tag" ("expenseExpenseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9e9a642c8cf1274d869658daed" ON "expense_tags_tag" ("tagTagId") `);
        await queryRunner.query(`ALTER TABLE "expense_tags_tag" ADD CONSTRAINT "FK_aee6627ef164cbc98d6de3853b6" FOREIGN KEY ("expenseExpenseId") REFERENCES "expense"("expenseId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "expense_tags_tag" ADD CONSTRAINT "FK_9e9a642c8cf1274d869658daed9" FOREIGN KEY ("tagTagId") REFERENCES "tag"("tagId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense_tags_tag" DROP CONSTRAINT "FK_9e9a642c8cf1274d869658daed9"`);
        await queryRunner.query(`ALTER TABLE "expense_tags_tag" DROP CONSTRAINT "FK_aee6627ef164cbc98d6de3853b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9e9a642c8cf1274d869658daed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aee6627ef164cbc98d6de3853b"`);
        await queryRunner.query(`DROP TABLE "expense_tags_tag"`);
    }

}
