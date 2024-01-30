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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../models/userModel"); // Update the import statement
const jwtAuth_1 = require("../utils/auth/jwtAuth");
const router = express_1.default.Router();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check for required fields in the request body
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required fields" });
        }
        // check isEmail
        if ((!email.match(/\S+@\S+\.\S+/) || email.length < 4 || email.length > 250)) {
            return res.status(400).json({ message: "User not found" });
        }
        // Validate password format
        if (!password.match(/\d/) || !password.match(/[a-zA-Z]/) || password.length < 8 || password.length > 250) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        // Find the user by email in the database
        const user = yield userModel_1.User.findOne({ where: { email } });
        // If the user does not exist, return an error
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Compare the provided password with the hashed password in the database
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        // If the passwords don't match, return an error
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // If the user exists and the password is correct, generate a JWT token
        const token = yield (0, jwtAuth_1.generateAccessToken)(user);
        console.log(token);
        // Send the token in the response
        res.json({ message: "Login successful", token });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
}));
router.get("/isAuthenticated", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, jwtAuth_1.authenticateToken)(req, res, () => {
            res.json({ message: "Authenticated" });
        });
    }
    catch (error) {
        console.error("Error during authentication:", error);
    }
}));
exports.default = router;
