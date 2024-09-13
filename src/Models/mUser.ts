import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize('sqlite::memory')

const mUser = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
}) 