import {MigrationInterface, QueryRunner} from "typeorm";

export class RecurringExpensesJoinTableTags1648913875086 implements MigrationInterface {
    name = 'RecurringExpensesJoinTableTags1648913875086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recurring_expense_tags_tag" ("recurringExpenseRecurringExpenseId" uuid NOT NULL, "tagTagId" uuid NOT NULL, CONSTRAINT "PK_2dad7704badac3fdf3332830e3c" PRIMARY KEY ("recurringExpenseRecurringExpenseId", "tagTagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_804d4803fef7f6b1e48888a2a1" ON "recurring_expense_tags_tag" ("recurringExpenseRecurringExpenseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_38afb699b98643c4a763c6a500" ON "recurring_expense_tags_tag" ("tagTagId") `);
        await queryRunner.query(`ALTER TABLE "recurring_expense_tags_tag" ADD CONSTRAINT "FK_804d4803fef7f6b1e48888a2a12" FOREIGN KEY ("recurringExpenseRecurringExpenseId") REFERENCES "recurring_expense"("recurringExpenseId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "recurring_expense_tags_tag" ADD CONSTRAINT "FK_38afb699b98643c4a763c6a500f" FOREIGN KEY ("tagTagId") REFERENCES "tag"("tagId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurring_expense_tags_tag" DROP CONSTRAINT "FK_38afb699b98643c4a763c6a500f"`);
        await queryRunner.query(`ALTER TABLE "recurring_expense_tags_tag" DROP CONSTRAINT "FK_804d4803fef7f6b1e48888a2a12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_38afb699b98643c4a763c6a500"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_804d4803fef7f6b1e48888a2a1"`);
        await queryRunner.query(`DROP TABLE "recurring_expense_tags_tag"`);
    }

}
