
import express, { Application, Request, Response } from "express"
import { model, Schema } from "mongoose";
import { bookRoutes } from "./app/controller/book.controller";
import { userRoutes } from "./app/controller/user.controller";
import { borrowRoutes } from "./app/controller/borrow.controller";
const app:Application = express();

app.use(express.json());

app.use("/books", bookRoutes)
app.use("/books", bookRoutes)
app.use("/book", bookRoutes)
app.use("/book", bookRoutes)

app.use("/user", userRoutes)

app.use("/borrow", borrowRoutes)
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

app.get("/", (req:Request ,res:Response)=>{
    res.send("Hellow World");
})



export default app;