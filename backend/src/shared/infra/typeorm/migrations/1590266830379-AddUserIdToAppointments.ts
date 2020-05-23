import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AddUserIdToAppointments1590266830379 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "user_id",
        type: "uuid",
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      "appointments",
      new TableForeignKey({
        name: "fk_users_customer",
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("appointments", "fk_users_customer");
    await queryRunner.dropColumn("appointments", "user_id");
  }
}
