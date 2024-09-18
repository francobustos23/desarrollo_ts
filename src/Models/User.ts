import { Table, Column, Model, DataType, PrimaryKey, Default, HasMany } from 'sequelize-typescript';
import {v4 as uuidv4} from 'uuid';
import Equipment from './Equipment';

interface ValidRoles {
    ADMIN: 'admin';
    SUPERVISOR: 'supervisor';
}

@Table({
    timestamps: false,
    tableName: 'users'
})
class User extends Model {
    @Default(uuidv4)
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    User_id!: string;
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    email!: string;
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string;
    @Column({
        type: DataType.ENUM('ADMIN', 'USER'),
        allowNull: false
    })
    role!: ValidRoles;
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    state!: boolean;
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    createdAt!: Date;
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    updatedAt!: Date;
}

export default User;