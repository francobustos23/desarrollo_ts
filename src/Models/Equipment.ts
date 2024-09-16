import { DataTypes, Model } from "sequelize";
import db from "../config/db";

type EquipmentAtrributes = {
    id?: number;
    name: string;
    stock: number;
    state?: boolean;
}

type EquipmentCreationAttributes = EquipmentAtrributes;

class Equipment extends Model<EquipmentAtrributes, EquipmentCreationAttributes> {
    public id!: number;
    public name!: string;
    public stock!: number;
    public state!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Equipment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    tableName: 'equipment',
    timestamps: true,
    sequelize: db
});

export default Equipment;