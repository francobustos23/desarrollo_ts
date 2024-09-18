import { Sequelize } from "sequelize-typescript";
import { envs } from "../environments/environments";
import { User, Equipment, Category } from '../Models/index'

const {
    DB_DIALECT,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USER
} = envs;

const db = new Sequelize({
    database: DB_NAME,
    dialect: DB_DIALECT,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    models: [
        User,
        Equipment,
        Category
    ]
});

export default db;