import { Types } from "mongoose";

export interface IBorrow  {
  book: Types.ObjectId;
  user: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}