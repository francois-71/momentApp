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
// src/controllers/registerController.ts
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../models/userModel"); // Update the import statement
const router = express_1.default.Router();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check for required fields in the request body
        if (!req.body.email || !req.body.password || !req.body.name || !req.body.age) {
            return res.status(400).json({ message: 'Email, password, Name, and Age are required fields' });
        }
        // Check if user already exists
        const existingUser = yield userModel_1.User.findOne({ where: { email: req.body.email } }); // Use User instead of User
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        // Hash the password
        // Create a new user (password is hashed)
        const newUser = yield userModel_1.User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            age: req.body.age,
        });
        newUser.password = yield bcrypt_1.default.hash(req.body.password, 10);
        if (!newUser) {
            return res.status(400).json({ message: 'User registration failed' });
        }
        res.json({ message: 'Registration successful!', user: newUser });
    }
    catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Handle validation errors
            const validationErrors = error.errors.map((err) => err.message);
            return res.status(400).json({ message: 'Validation error', errors: validationErrors });
        }
        console.error('Error during registration:', error);
        res.status(500).send('Internal Server Error');
    }
}));
exports.default = router;
