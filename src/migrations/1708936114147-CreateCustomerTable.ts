import type { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateCustomerTable1708936114147 implements MigrationInterface {
	name = 'CreateCustomerTable1708936114147'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "customers" ("id" character varying(128) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "first_name" character varying(255) NOT NULL, "middle_name" character varying(255), "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" text NOT NULL, "status" "public"."customers_status_enum" NOT NULL DEFAULT 'active', CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "customers"`)
	}
}
