import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "usrs",
})
export class User extends Model {
  userId?: number;
  userUuid?: string;
  userUsername?: string;
  userPassword?: string;
  userStatus?: number;
  createdBy?: number;
  createdDate?: Date;
  updatedBy?: number;
  updatedDate?: Date;

  static initModel(sequelize: Sequelize) {
    return super.init(
      {
        userId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'usrs_id'
        },
        userUuid: {
          type: DataTypes.STRING,
          defaultValue: UUIDV4,
          field: 'usrs_uuid'
        },
        userUsername: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'usrs_username'
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'usrs_password'
        },
        userStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'usrs_status',
            defaultValue: 0
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'created_by'
        },
        createdDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_date',
            defaultValue: new Date()
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'updated_by'
        },
        updatedDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updated_date'
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'usrs',
      }
    );
  }
}