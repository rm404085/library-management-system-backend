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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const booki_model_1 = require("../models/booki.model");
exports.borrowRoutes = express_1.default.Router();
const borrowBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield booki_model_1.Book.findById(data.book);
    if (!book)
        throw new Error("Book not found");
    if (book.copies < data.quantity) {
        throw new Error("Not enough copies available");
    }
    // কপি কমানো
    book.copies -= data.quantity;
    if (book.copies === 0)
        book.available = 0;
    yield book.save();
    // Borrow রেকর্ড তৈরি
    const borrow = yield borrow_model_1.Borrow.create(data);
    return borrow;
});
const getBorrowSummary = () => __awaiter(void 0, void 0, void 0, function* () {
    // সব borrow রেকর্ড আনো
    const borrows = yield borrow_model_1.Borrow.find().populate("book", "title isbn");
    // সিম্পল রিপোর্ট বানানো
    const summary = {};
    borrows.forEach((b) => {
        const bookId = b.book._id.toString();
        if (!summary[bookId]) {
            summary[bookId] = {
                book: {
                    title: b.book.title,
                    isbn: b.book.isbn,
                },
                totalQuantity: 0,
            };
        }
        summary[bookId].totalQuantity += b.quantity;
    });
    return Object.values(summary);
});
exports.borrowRoutes.post("/create-borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrow = yield borrowBook(req.body);
        res.status(201).json({
            success: true,
            message: "borrow create  successfully",
            borrow
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
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield getBorrowSummary();
    res.status(201).json({
        success: true,
        message: "All borrow Created",
        books
    });
}));
