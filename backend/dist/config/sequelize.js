"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();
const sequelize = new Sequelize({
    dialect: "postgres", // Use the appropriate dialect for your database (e.g., 'mysql', 'postgres', 'sqlite')
    host: process.env.DATABASE_HOSTNAME,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    define: {
        timestamps: true, // enable auto timestamps 
    },
});
exports.default = sequelize;
