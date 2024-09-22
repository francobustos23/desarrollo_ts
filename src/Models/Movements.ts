import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Default, PrimaryKey } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Equipment from "./Equipment";
import User from "./User";

interface ValidTypes {
    ENTRADA: 'ENTRADA';
    SALIDA: 'SALIDA';
}

@Table({
    timestamps: false,
    tableName: "movements",
})


class Movement extends Model {
    @Default(uuidv4)
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    id!: string;
    @Column({
        type: DataType.ENUM('ENTRADA', 'SALIDA'),
        allowNull: false,
    })
    type!: ValidTypes;
    
    @ForeignKey(() => User)
    userId!: string;
    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Equipment)
    equipmentId!: string;
    @BelongsTo(() => Equipment)
    equipment!: Equipment;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description!: string;
    @Column({
        type: DataType.STRING,
        defaultValue: true,
    })
    state!: string;
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt!: Date;
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    updatedAt!: Date;
}

export default Movement;