import { bookData } from "../data/BooksData";
import type { Book } from "../models/Book";

export class BookRespository{
    getAllBooks(): Book[]{
        return bookData;
    }
}