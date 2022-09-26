import dotenv from 'dotenv';
import { Sequelize, DataTypes } from "sequelize";

dotenv.config();

const DATABASE = process.env.DATABASE;
const USERNAME = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const DIALECT = process.env.DIALECT;

let db = {};

try {
    const sequelize = new Sequelize(`${DIALECT}://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}?sslmode=no-verify`)

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    db.DataTypes = DataTypes;

} catch (err) {
    throw err;
}

export { db }