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
exports.userRoutes = void 0;
const zod_1 = __importDefault(require("zod"));
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
exports.userRoutes = express_1.default.Router();
const userZodShema = zod_1.default.object({
    name: zod_1.default.string().min(2, "Name must be at least 2 characters long"),
    email: zod_1.default.string().email("Invalid email address"),
    password: zod_1.default
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password must not exceed 20 characters"),
});
exports.userRoutes.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield userZodShema.parseAsync(req.body);
        const book = yield user_model_1.User.create(body);
        res.status(201).json({
            success: true,
            message: "user create  successfully",
            book
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    }
}));
exports.userRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield user_model_1.User.find(req.query);
    res.status(201).json({
        success: true,
        message: "All User Created",
        books
    });
}));
exports.userRoutes.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const book = yield user_model_1.User.findById(userId);
    res.status(201).json({
        success: true,
        message: "Single User Created",
        book
    });
}));
