import  express, { Request, Response }  from 'express';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/booki.model';



export const borrowRoutes = express.Router();

const borrowBook = async (data: { book: string; user: string; quantity: number; dueDate: Date }) => {
  const book = await Book.findById(data.book);
  if (!book) throw new Error("Book not found");

  if (book.copies < data.quantity) {
    throw new Error("Not enough copies available");
  }

  // কপি কমানো
  book.copies -= data.quantity;
  if (book.copies === 0) book.available = 0;
  await book.save();

  // Borrow রেকর্ড তৈরি
  const borrow = await Borrow.create(data);
  return borrow;
};

const getBorrowSummary = async () => {
  // সব borrow রেকর্ড আনো
  const borrows = await Borrow.find().populate("book", "title isbn");

  // সিম্পল রিপোর্ট বানানো
  const summary: any = {};

  borrows.forEach((b) => {
    const bookId = b.book._id.toString();

    if (!summary[bookId]) {
      summary[bookId] = {
        book: {
          title: (b.book as any).title,
          isbn: (b.book as any).isbn,
        },
        totalQuantity: 0,
      };
    }

    summary[bookId].totalQuantity += b.quantity;
  });

  return Object.values(summary);
};
borrowRoutes.post("/create-borrow", async(req:Request, res:Response)=>{

   try {
     

    const borrow = await borrowBook(req.body);

    res.status(201).json({
        success: true,
        message:"borrow create  successfully",
        borrow
    })
   } catch (error:any) {
    res.status(400).json({
        success: false,
        message:error.message,
        error
    })
   }

})

borrowRoutes.get("/", async(req:Request, res:Response)=> {

    const books = await  getBorrowSummary()

    res.status(201).json({
        success:true,
        message:"All borrow Created",
        books
    })
})