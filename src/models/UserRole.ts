import { Sequelize } from "sequelize";
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "usrs_rles",
})
export class UserRole extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        field: 'usrs_rles_id'
    })
    userRoleId!: number;

    @Column({
        type: DataType.STRING(100),
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        field: 'usrs_rles_uuid'
    })
    userRoleUuid?: string;


    @Column({
        type: DataType.STRING(20),
        field: 'usrs_rles_code'
    })
    userRoleCode?: string;

    @Column({
        type: DataType.STRING(200),
        field: 'usrs_rles_desc'
    })
    userRoleDesc?: string;

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