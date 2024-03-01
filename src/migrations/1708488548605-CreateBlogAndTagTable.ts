import type { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateBlogAndTagTable1708488548605 implements MigrationInterface {
	name = 'CreateBlogAndTagTable1708488548605'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "blogs" ("id" character varying(128) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(256) NOT NULL, "summary" text, "thumbnail" text, "content" text, "is_published" boolean NOT NULL, "published_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY ("id"))`,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_b9e1eb8aea30ea2192cd8f0a31" ON "blogs" ("title") `,
		)
		await queryRunner.query(
			`CREATE TABLE "tags" ("id" character varying(128) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
		)
		await queryRunner.query(
			`CREATE TABLE "blogs_tags" ("blog_id" character varying(128) NOT NULL, "tag_id" character varying(128) NOT NULL, CONSTRAINT "PK_bf3df454c1e08aff066e12dc38e" PRIMARY KEY ("blog_id", "tag_id"))`,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_377b848c1bf364f261f48c68bc" ON "blogs_tags" ("blog_id") `,
		)
		await queryRunner.query(
			`CREATE INDEX "IDX_30d6656ad4b7979788696aa470" ON "blogs_tags" ("tag_id") `,
		)
		await queryRunner.query(
			`ALTER TABLE "blogs_tags" ADD CONSTRAINT "FK_377b848c1bf364f261f48c68bc3" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		)
		await queryRunner.query(
			`ALTER TABLE "blogs_tags" ADD CONSTRAINT "FK_30d6656ad4b7979788696aa470c" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "blogs_tags" DROP CONSTRAINT "FK_30d6656ad4b7979788696aa470c"`,
		)
		await queryRunner.query(
			`ALTER TABLE "blogs_tags" DROP CONSTRAINT "FK_377b848c1bf364f261f48c68bc3"`,
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_30d6656ad4b7979788696aa470"`,
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_377b848c1bf364f261f48c68bc"`,
		)
		await queryRunner.query(`DROP TABLE "blogs_tags"`)
		await queryRunner.query(`DROP TABLE "tags"`)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_b9e1eb8aea30ea2192cd8f0a31"`,
		)
		await queryRunner.query(`DROP TABLE "blogs"`)
	}
}
