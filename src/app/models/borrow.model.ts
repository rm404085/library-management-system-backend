import { model, Schema } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";
import { Book } from "./booki.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);
borrowSchema.post("save", async function () {
  const borrowed = this as IBorrow;
  const book = await Book.findById(borrowed.book);
  if (book && book.copies === 0) {
    book.available = 0;
    await book.save();
  }
});
export const Borrow = model<IBorrow>("Borrow", borrowSchema)