import { DataTypes, Model, Optional } from "sequelize";
import db from "../config/db";

type UserAttributes = {
    id?: number;
    name: string;
    email: string;
    password: string;
    state?: boolean;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public state!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100]
        }
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    tableName: 'users',
    timestamps: true,
    sequelize: db
});

export default User;
