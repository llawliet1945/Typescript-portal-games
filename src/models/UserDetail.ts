import { Sequelize } from "sequelize";
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "usrs_detl",
})
export class UserDetail extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        field: 'usrs_detl_id'
    })
    userDetailId!: number;

    @Column({
        type: DataType.STRING(100),
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        field: 'usrs_detl_uuid'
    })
    userDetailUuid?: string;

    @Column({
        type: DataType.BIGINT,
        field: 'usrs_id'
    })
    userId?: number;

    @Column({
        type: DataType.STRING(40),
        field: 'usrs_detl_frstnme'
    })
    userDetailFirstname?: string;

    @Column({
        type: DataType.STRING(40),
        field: 'usrs_detl_lastnme'
    })
    userDetailLastname?: string;

    @Column({
        type: DataType.STRING(14),
        field: 'usrs_detl_phone'
    })
    userDetailPhone?: string;

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