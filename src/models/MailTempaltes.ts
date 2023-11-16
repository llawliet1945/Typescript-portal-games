import { Sequelize } from "sequelize";
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "mail_tmplte",
})
export class MailTempalte extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        field: 'mail_tmplte_id'
    })
    mailTemplateId!: number;

    @Column({
        type: DataType.STRING(100),
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        field: 'mail_tmplte_uuid'
    })
    mailTemplateUuid?: string;

    @Column({
        type: DataType.STRING(30),
        field: 'mail_tmplte_code'
    })
    mailTemplateCode?: string;

    @Column({
        type: DataType.STRING(40),
        field: 'mail_tmplte_sbjct'
    })
    mailTemplateSubject?: string;

    @Column({
        type: DataType.STRING(1000),
        field: 'mail_tmplte_msg'
    })
    mailTemplateMessage?: string;

    @Column({
        type: DataType.SMALLINT,
        field: 'mail_tmplte_sttus',
        defaultValue: 0
    })
    mailTemplateStatus?: number;

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