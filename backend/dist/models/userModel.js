"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User = sequelize_2.default.define("user", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: {
                msg: 'Name must only contain letters',
            },
            len: {
                args: [2, 250],
                msg: 'Name must be between 2 and 250 characters.',
            },
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Invalid email format",
            },
            len: {
                args: [4, 250],
                msg: "Email must be between 4 and 250 characters.",
            },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, 250],
                msg: "Password must be between 8 and 250 characters.",
            },
            containsLetterAndNumber(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error("Password must contain at least one letter and one number.");
                }
            },
        },
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        validate: {
            validateAge(value) {
                if (value !== null && (value < 18 || value > 99)) {
                    throw new Error("Age must be between 18 and 99.");
                }
            },
        },
    },
}, {
    hooks: {
        beforeCreate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            // Hash the password before creating the user
            const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
            user.password = hashedPassword;
        }),
        beforeUpdate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            // Hash the password before updating the user, if the password is changed
            if (user.changed('password')) {
                const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
                user.password = hashedPassword;
            }
        }),
    },
});
exports.User = User;
