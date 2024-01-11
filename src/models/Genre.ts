import { Sequelize } from "sequelize";
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "gnre",
})
export class Genre extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        field: 'gnre_id'
    })
    genreId!: number;

    @Column({
        type: DataType.STRING(100),
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        field: 'gnre_uuid'
    })
    genreUuid?: string;

    @Column({
        type: DataType.STRING(40),
        field: 'gnre_nme'
    })
    genreName?: string;

    @Column({
        type: DataType.STRING(500),
        field: 'gnre_descrptn'
    })
    genreDesc?: string;

    @Column({
        type: DataType.SMALLINT,
        field: 'gnre_sttus',
        defaultValue: 0
    })
    genreStatus?: number;

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