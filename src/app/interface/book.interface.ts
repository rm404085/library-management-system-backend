export interface IBook {
  title: string;
  author: string;
  genre: "FICTION" | "SCIENCE" | "HISTORY" | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: number;
  isAvailable(): boolean;
}