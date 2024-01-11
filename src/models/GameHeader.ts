import { Sequelize } from "sequelize";
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "gme_head",
})
export class gameHead extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        field: 'gme_head_id'
    })
    gameHeadId!: number;

    @Column({
        type: DataType.STRING(100),
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        field: 'gme_head_uuid'
    })
    gameHeadUuid?: string;

    @Column({
        type: DataType.STRING(40),
        field: 'gme_head_nme'
    })
    gameHeadName?: string;

    @Column({
        type: DataType.STRING(500),
        field: 'gme_head_descrptn'
    })
    gameHeadDesc?: string;

    @Column({
        type: DataType.SMALLINT,
        field: 'gme_head_sttus',
        defaultValue: 0
    })
    gameHeadStatus?: number;

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