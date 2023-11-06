import { Sequelize } from "sequelize";
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, AllowNull } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "usrs",
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    field: 'usrs_id'
  })
  userId!: number;

  @Column({
    type: DataType.STRING(100),
    defaultValue: Sequelize.literal("gen_random_uuid()"),
    field: 'usrs_uuid'
  })
  userUuid?: string;

  @Column({
    type: DataType.STRING(60),
    field: 'usrs_usrnme'
  })
  userUsername!: string;

  @Column({
    type: DataType.STRING(100),
    field: 'usrs_pass'
  })
  userPass!: string;

  @Column({
    type: DataType.INTEGER,
    field: 'usrs_sttus',
    defaultValue: 0
  })
  userStatus?: number;

  @Column({
    type: DataType.INTEGER,
    field: 'created_by'
  })
  createdBy?: number;

  @Column({
    type: DataType.DATE,
    field: 'created_date',
    defaultValue: Sequelize.literal("now()")
  })
  createdDate?: Date;

  @Column({
    type: DataType.INTEGER,
    field: 'updated_by'
  })
  updatedBy?: number;

  @Column({
    type: DataType.DATE,
    field: 'updated_date'
  })
  updatedDate?: Date;
}