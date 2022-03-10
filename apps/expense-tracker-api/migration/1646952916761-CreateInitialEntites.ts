import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateInitialEntites1646952916761 implements MigrationInterface {
    name = 'CreateInitialEntites1646952916761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subcategory" ("subcategoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "categoryCategoryId" uuid, CONSTRAINT "PK_81da746878261f7a4203fa5d47f" PRIMARY KEY ("subcategoryId"))`);
        await queryRunner.query(`CREATE TABLE "category" ("categoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "color" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "accountAccountId" uuid, CONSTRAINT "PK_8a300c5ce0f70ed7945e877a537" PRIMARY KEY ("categoryId"))`);
        await queryRunner.query(`CREATE TABLE "payment_method" ("paymentMethodId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "accountAccountId" uuid, CONSTRAINT "PK_c07b0b12b34981558fc7612ee8a" PRIMARY KEY ("paymentMethodId"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("tagId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "accountAccountId" uuid, CONSTRAINT "PK_42bce6149e744e5cb7b11893348" PRIMARY KEY ("tagId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "thirdPartyId" character varying, "email" character varying, "phone" character varying, "firstName" character varying, "lastName" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_19de43e9f1842360ce646253d75" UNIQUE ("thirdPartyId"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "account" ("accountId" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountName" character varying NOT NULL, "userUserId" uuid, CONSTRAINT "REL_a5887a57569bd23a9fde59e645" UNIQUE ("userUserId"), CONSTRAINT "PK_b1a9fdd281787a66a213f5b725b" PRIMARY KEY ("accountId"))`);
        await queryRunner.query(`CREATE TABLE "expense" ("expenseId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "month" integer NOT NULL, "day" integer NOT NULL, "amountCents" integer NOT NULL DEFAULT '0', "split" integer, "splitPaid" boolean, "notes" character varying, "categoryCategoryId" uuid, "subcategorySubcategoryId" uuid, CONSTRAINT "PK_dbe84a016f1097c0ed5b153a720" PRIMARY KEY ("expenseId"))`);
        await queryRunner.query(`CREATE TABLE "recurring_expense" ("recurringExpenseId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "day" integer NOT NULL, "amountCents" integer NOT NULL DEFAULT '0', "split" integer, "active" boolean NOT NULL DEFAULT true, "categoryCategoryId" uuid, "subcategorySubcategoryId" uuid, CONSTRAINT "PK_da5e9d25263f4b75a8455168d7e" PRIMARY KEY ("recurringExpenseId"))`);
        await queryRunner.query(`ALTER TABLE "subcategory" ADD CONSTRAINT "FK_3824ddfb10a22883c75fe46d0a4" FOREIGN KEY ("categoryCategoryId") REFERENCES "category"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_efe8be4224b7590bbcfbd96e1a1" FOREIGN KEY ("accountAccountId") REFERENCES "account"("accountId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_method" ADD CONSTRAINT "FK_2ee401bc4b096f20bae3bed2253" FOREIGN KEY ("accountAccountId") REFERENCES "account"("accountId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_2bb7d355a566dda9ab2b472d27e" FOREIGN KEY ("accountAccountId") REFERENCES "account"("accountId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_a5887a57569bd23a9fde59e6456" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expense" ADD CONSTRAINT "FK_a23b3bc3bcd116b9f798692f859" FOREIGN KEY ("categoryCategoryId") REFERENCES "category"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expense" ADD CONSTRAINT "FK_97e62cd2300d097cfb978656823" FOREIGN KEY ("subcategorySubcategoryId") REFERENCES "subcategory"("subcategoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recurring_expense" ADD CONSTRAINT "FK_acdfaaf741bf108d297951d1920" FOREIGN KEY ("categoryCategoryId") REFERENCES "category"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recurring_expense" ADD CONSTRAINT "FK_5164f3177aa88159cce67d7aa7a" FOREIGN KEY ("subcategorySubcategoryId") REFERENCES "subcategory"("subcategoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurring_expense" DROP CONSTRAINT "FK_5164f3177aa88159cce67d7aa7a"`);
        await queryRunner.query(`ALTER TABLE "recurring_expense" DROP CONSTRAINT "FK_acdfaaf741bf108d297951d1920"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP CONSTRAINT "FK_97e62cd2300d097cfb978656823"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP CONSTRAINT "FK_a23b3bc3bcd116b9f798692f859"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_a5887a57569bd23a9fde59e6456"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_2bb7d355a566dda9ab2b472d27e"`);
        await queryRunner.query(`ALTER TABLE "payment_method" DROP CONSTRAINT "FK_2ee401bc4b096f20bae3bed2253"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_efe8be4224b7590bbcfbd96e1a1"`);
        await queryRunner.query(`ALTER TABLE "subcategory" DROP CONSTRAINT "FK_3824ddfb10a22883c75fe46d0a4"`);
        await queryRunner.query(`DROP TABLE "recurring_expense"`);
        await queryRunner.query(`DROP TABLE "expense"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "payment_method"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "subcategory"`);
    }

}
