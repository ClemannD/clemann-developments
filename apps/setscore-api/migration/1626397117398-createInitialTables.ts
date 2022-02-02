import { MigrationInterface, QueryRunner } from 'typeorm';

export class createInitialTables1626397117398 implements MigrationInterface {
    name = 'createInitialTables1626397117398';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "season" (
                "seasonId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "seasonNumber" integer NOT NULL,
                "isCurrentSeason" boolean NOT NULL DEFAULT false,
                "leagueId" character varying,
                "leagueLeagueId" uuid,
                CONSTRAINT "UQ_9914547481a3c9c84126118b4ab" UNIQUE ("seasonNumber"),
                CONSTRAINT "PK_127d97d7a0dadc7b35c2a360ef9" PRIMARY KEY ("seasonId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "userId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "thirdPartyId" character varying,
                "email" character varying,
                "phone" character varying,
                "firstName" character varying,
                "lastName" character varying,
                "role" character varying NOT NULL DEFAULT 'Player',
                "status" character varying NOT NULL DEFAULT 'Placeholder',
                "oldUserId" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_19de43e9f1842360ce646253d75" UNIQUE ("thirdPartyId"),
                CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_to_league" (
                "userId" character varying NOT NULL,
                "leagueId" character varying NOT NULL,
                "leagueMemberType" character varying NOT NULL DEFAULT 'Player',
                "isUserCurrentLeague" boolean NOT NULL DEFAULT false,
                "inviteCode" character varying NOT NULL,
                "userUserId" uuid,
                "leagueLeagueId" uuid,
                CONSTRAINT "UQ_23eb49d95f7bda788f80e40aea1" UNIQUE ("inviteCode"),
                CONSTRAINT "PK_2807ee7b0e2012bf4675400e02e" PRIMARY KEY ("userId", "leagueId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "league" (
                "leagueId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "state" character varying NOT NULL,
                "city" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_347f0861f12c54492c553729403" PRIMARY KEY ("leagueId")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "season"
            ADD CONSTRAINT "FK_d4fcddb1fd44195d09d32943601" FOREIGN KEY ("leagueLeagueId") REFERENCES "league"("leagueId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_to_league"
            ADD CONSTRAINT "FK_e11862c39c476be5133d1b16cc2" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_to_league"
            ADD CONSTRAINT "FK_eccc703ee293077969169e7355c" FOREIGN KEY ("leagueLeagueId") REFERENCES "league"("leagueId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_to_league" DROP CONSTRAINT "FK_eccc703ee293077969169e7355c"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_to_league" DROP CONSTRAINT "FK_e11862c39c476be5133d1b16cc2"
        `);
        await queryRunner.query(`
            ALTER TABLE "season" DROP CONSTRAINT "FK_d4fcddb1fd44195d09d32943601"
        `);
        await queryRunner.query(`
            DROP TABLE "league"
        `);
        await queryRunner.query(`
            DROP TABLE "user_to_league"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "season"
        `);
    }
}
