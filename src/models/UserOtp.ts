import { Sequelize } from "sequelize";
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "usrs_otp",
})
export class UserOtp extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        field: 'usrs_otp_id'
    })
    userOtpId!: number;

    @Column({
        type: DataType.STRING(100),
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        field: 'usrs_otp_uuid'
    })
    userOtpUuid?: string;

    @Column({
        type: DataType.STRING(20),
        field: 'usrs_otp_code'
    })
    userOtpCode?: string;

    @Column({
        type: DataType.SMALLINT,
        field: 'usrs_otp_sttus',
        defaultValue: 0
    })
    userOtpStatus?: number;

    @Column({
        type: DataType.DATE,
        field: 'usrs_otp_exp_date'
    })
    userOtpExpiredDate?: Date;

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