"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controller/book.controller");
const user_controller_1 = require("./app/controller/user.controller");
const borrow_controller_1 = require("./app/controller/borrow.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/books", book_controller_1.bookRoutes);
app.use("/books", book_controller_1.bookRoutes);
app.use("/book", book_controller_1.bookRoutes);
app.use("/book", book_controller_1.bookRoutes);
app.use("/user", user_controller_1.userRoutes);
app.use("/borrow", borrow_controller_1.borrowRoutes);
// const librarySchema = new Schema({
//     title:String,
//     author:String,
// })
// const Library = model("Library", librarySchema);
// app.post("/create-book", async(req:Request,res:Response)=>{
//     const myBook = new Library({
//         title:"Node js",
//         author:"RAsel"
//     })    
//     await myBook.save();
//     res.status(201).json({
//         success:true,
//         message:"book created",
//         book:myBook
//     })
// } )
app.get("/", (req, res) => {
    res.send("Hellow World");
});
exports.default = app;
