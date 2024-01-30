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
exports.authenticateToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = require("dotenv");
dotenv.config();
function generateAccessToken(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const secretKey = process.env.TOKEN_SECRET;
        if (!secretKey) {
            throw new Error("TOKEN_SECRET is not defined in the environment variables. Please set a secure secret key.");
        }
        const userObject = {
            id: user.id,
            email: user.email,
            name: user.name,
            age: user.age,
        };
        console.log(userObject.email);
        return jsonwebtoken_1.default.sign(userObject, secretKey, { expiresIn: "30m" });
    });
}
exports.generateAccessToken = generateAccessToken;
function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).send("No authorization header provided");
        }
        const tokenParts = authHeader.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== "bearer") {
            return res.status(401).send("Invalid token format");
        }
        const token = tokenParts[1];
        const secretKey = process.env.TOKEN_SECRET;
        if (token === "undefined") {
            return res.status(401).send("Invalid token");
        }
        if (!secretKey) {
            throw new Error("TOKEN_SECRET is not defined in the environment variables. Please set a secure secret key.");
        }
        jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.error("Error verifying token:", err);
                return res.status(403).send("Invalid token");
            }
            // Attach the decoded payload to the request object for use in subsequent middleware or routes
            req.userId = decoded.id;
            next();
        });
    }
    catch (error) {
        console.error("Error during token authentication:", error);
        res.status(500).send("Internal Server Error");
    }
}
exports.authenticateToken = authenticateToken;
