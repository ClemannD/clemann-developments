import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPaymentMethodToRecurringExpenses1648912223876 implements MigrationInterface {
    name = 'AddPaymentMethodToRecurringExpenses1648912223876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurring_expense" ADD "notes" character varying`);
        await queryRunner.query(`ALTER TABLE "recurring_expense" ADD "paymentMethodPaymentMethodId" uuid`);
        await queryRunner.query(`ALTER TABLE "recurring_expense" ADD CONSTRAINT "FK_48259342b96a7eac977e5d89cf9" FOREIGN KEY ("paymentMethodPaymentMethodId") REFERENCES "payment_method"("paymentMethodId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurring_expense" DROP CONSTRAINT "FK_48259342b96a7eac977e5d89cf9"`);
        await queryRunner.query(`ALTER TABLE "recurring_expense" DROP COLUMN "paymentMethodPaymentMethodId"`);
        await queryRunner.query(`ALTER TABLE "recurring_expense" DROP COLUMN "notes"`);
    }

}
