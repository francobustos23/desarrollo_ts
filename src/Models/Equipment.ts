import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo, PrimaryKey, Default } from "sequelize-typescript";
import {User, Category} from "./index"
import {v4 as uuidv4} from "uuid";

@Table({
    timestamps: false,
    tableName: "equipments",
})

class Equipment extends Model {
    @Default(uuidv4)
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    id!: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;
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

export default Equipment;