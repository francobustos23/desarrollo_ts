import { Table, Column, Model, DataType, PrimaryKey, Default, HasMany } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Equipment from "./Equipment";

@Table({
    timestamps: false,
    tableName: "categories",
})

class Category extends Model {
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
    @HasMany(() => Equipment)
    equipments!: Equipment[];
}

export default Category;