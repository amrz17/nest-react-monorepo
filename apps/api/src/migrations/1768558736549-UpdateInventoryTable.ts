import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateInventoryTable1768558736549 implements MigrationInterface {
    name = 'UpdateInventoryTable1768558736549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "qyt_available"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "qyt_reserved"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "qty_available" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "qty_reserved" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_c8c4617b0e2d3ed23f646a44dbb"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_2ff5ba049682716af334bce51ee"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "UQ_954acca8e3bbb4d268b98e6ed12"`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "id_item" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "id_location" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "UQ_954acca8e3bbb4d268b98e6ed12" UNIQUE ("id_item", "id_location")`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_c8c4617b0e2d3ed23f646a44dbb" FOREIGN KEY ("id_item") REFERENCES "items"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_2ff5ba049682716af334bce51ee" FOREIGN KEY ("id_location") REFERENCES "locations"("id_location") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_2ff5ba049682716af334bce51ee"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_c8c4617b0e2d3ed23f646a44dbb"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "UQ_954acca8e3bbb4d268b98e6ed12"`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "id_location" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ALTER COLUMN "id_item" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "UQ_954acca8e3bbb4d268b98e6ed12" UNIQUE ("id_item", "id_location")`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_2ff5ba049682716af334bce51ee" FOREIGN KEY ("id_location") REFERENCES "locations"("id_location") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_c8c4617b0e2d3ed23f646a44dbb" FOREIGN KEY ("id_item") REFERENCES "items"("id_item") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "qty_reserved"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "qty_available"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "qyt_reserved" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD "qyt_available" integer NOT NULL DEFAULT '0'`);
    }

}
