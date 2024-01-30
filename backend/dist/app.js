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
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = __importDefault(require("./config/sequelize"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
const port = 3000;
const corsOptions = {
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize_1.default.authenticate();
        console.log('Connection to the database has been established successfully.');
        // Sync models with the database
        yield sequelize_1.default.sync();
        console.log('Models have been synchronized with the database.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}))();
// Use loginRoutes for login-related routes
app.use(authRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Hello, this is the homepage!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
