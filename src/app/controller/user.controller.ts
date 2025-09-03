import z from "zod";
import express, { Request, Response }  from 'express';
import { User } from "../models/user.model";

export const userRoutes = express.Router();
const userZodShema = z.object({
     name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must not exceed 20 characters"),
  
})


userRoutes.post("/create-user", async(req:Request, res:Response)=>{

   try {
     const body = await userZodShema.parseAsync(req.body);

    const book = await User.create(body);

    res.status(201).json({
        success: true,
        message:"user create  successfully",
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

userRoutes.get("/", async(req:Request, res:Response)=> {

    const books = await User.find(req.query)

    res.status(201).json({
        success:true,
        message:"All User Created",
        books
    })
})

userRoutes.get("/:userId", async(req:Request, res:Response)=>{

    const userId = req.params.userId

    const book = await User.findById(userId)

    res.status(201).json({
        success:true,
        message:"Single User Created",
        book
    })
})