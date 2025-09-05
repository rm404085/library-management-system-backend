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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booki_model_1 = require("../models/booki.model");
const zod_1 = __importDefault(require("zod"));
exports.bookRoutes = express_1.default.Router();
const bookZodShema = zod_1.default.object({
    title: zod_1.default.string(),
    author: zod_1.default.string(),
    genre: zod_1.default.string(),
    isbn: zod_1.default.string(),
    description: zod_1.default.string().optional(),
    copies: zod_1.default.number(),
    available: zod_1.default.number()
});
exports.bookRoutes.post("/create-book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield bookZodShema.parseAsync(req.body);
        const book = yield booki_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "book create  successfully",
            book
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    }
}));
// Service Layer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getBooksService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const sortBy = query.sortBy || "createdAt";
    const sortOrder = query.sort === "asc" ? 1 : -1;
    const limit = Number(query.limit) || 10;
    const filterQuery = query.genre ? { genre: query.genre } : {};
    const books = yield booki_model_1.Book.find(filterQuery)
        .sort({ [sortBy]: sortOrder })
        .limit(limit);
    return books;
});
exports.bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield getBooksService(req.query);
    res.status(201).json({
        success: true,
        message: "All Book Created",
        books
    });
}));
exports.bookRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield booki_model_1.Book.findById(bookId);
    res.status(201).json({
        success: true,
        message: "Single Book Created",
        book
    });
}));
exports.bookRoutes.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const updateBook = yield booki_model_1.Book.findByIdAndUpdate(bookId, updatedBody, { new: true });
    res.status(201).json({
        success: true,
        message: "Updated Book successfully",
        updateBook
    });
}));
exports.bookRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const deleteBook = yield booki_model_1.Book.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: "Deleted Book successfully",
        deleteBook
    });
}));
