"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/loginRoutes.ts
const express_1 = __importDefault(require("express"));
const loginController_1 = __importDefault(require("../controllers/loginController"));
const registerController_1 = __importDefault(require("../controllers/registerController"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.use('/api', loginController_1.default);
router.use('/api', registerController_1.default);
router.use('/api', userController_1.default);
exports.default = router;
