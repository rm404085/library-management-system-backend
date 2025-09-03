import { model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";




const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: ["FICTION", "SCIENCE", "HISTORY", "FANTASY"],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Book = model<IBook>("Book", bookSchema)
