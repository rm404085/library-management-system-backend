
import express, { Request, Response } from 'express';
import { Book } from '../models/booki.model';
import z from 'zod';


export const bookRoutes = express.Router();

const bookZodShema = z.object({
     title: z.string(),
  author: z.string(),
  genre: z.string(),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number(),
  available: z.number()
  
})

bookRoutes.post("/create-book", async(req:Request, res:Response)=>{

   try {
     const body = await bookZodShema.parseAsync(req.body);

    const book = await Book.create(body);

    res.status(201).json({
        success: true,
        message:"book create  successfully",
        book
    })
   } catch (error:any) {
    res.status(400).json({
        success: false,
        message:error.message,
        error
    })
   }

})
// Service Layer
 const getBooksService = async (query: any) => {
  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sort === "asc" ? 1 : -1;
  const limit = Number(query.limit) || 10;

  const filterQuery = query.genre ? { genre: query.genre } : {};

  const books = await Book.find(filterQuery)
    .sort({ [sortBy]: sortOrder })
    .limit(limit);

  return books;
};

bookRoutes.get("/", async(req:Request, res:Response)=> {

    const books = await getBooksService(req.query)

    res.status(201).json({
        success:true,
        message:"All Book Created",
        books
    })
})

bookRoutes.get("/:bookId", async(req:Request, res:Response)=>{

    const bookId = req.params.bookId

    const book = await Book.findById(bookId)

    res.status(201).json({
        success:true,
        message:"Single Book Created",
        book
    })
})

bookRoutes.patch("/:bookId", async(req:Request, res:Response)=>{
    const bookId = req.params.bookId;
    const updatedBody = req.body;

    const updateBook = await Book.findByIdAndUpdate(bookId, updatedBody, {new:true})
    res.status(201).json({
        success:true,
        message:"Updated Book successfully",
        updateBook
    })
})
bookRoutes.delete("/:bookId", async(req:Request, res:Response)=>{
    const bookId = req.params.bookId;
   

    const deleteBook = await Book.findByIdAndDelete(bookId)
    res.status(201).json({
        success:true,
        message:"Deleted Book successfully",
        deleteBook
    })
})