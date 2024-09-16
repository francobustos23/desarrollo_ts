import { Sequelize } from "sequelize";
import { envs } from "../environments/environments";

const {
    DB_DIALECT,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USER
} = envs;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT
});

export const syncDB = async () => {
    await db.drop().then(() => {
        console.log('database drop');
    }).catch((error) => {
        console.error('error drop database:', error);
    });
    await db.sync({force: false}).then(() => {
        console.log('database sync');
    }).catch((error) => {
        console.error('error sync database:', error);
    });
}

export default db;