import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPaymentMethodToExpense1647660629164 implements MigrationInterface {
    name = 'AddPaymentMethodToExpense1647660629164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense" ADD "paymentMethodPaymentMethodId" uuid`);
        await queryRunner.query(`ALTER TABLE "expense" ADD CONSTRAINT "FK_8ab3d33d8b093f2aeeac29284e8" FOREIGN KEY ("paymentMethodPaymentMethodId") REFERENCES "payment_method"("paymentMethodId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense" DROP CONSTRAINT "FK_8ab3d33d8b093f2aeeac29284e8"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP COLUMN "paymentMethodPaymentMethodId"`);
    }

}
