"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/sequelize.ts
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'momentPassword',
    database: 'momentauthapp',
    define: {
        timestamps: false, // Disable Sequelize's automatic timestamp fields (createdAt, updatedAt)
    },
});
exports.default = sequelize;
