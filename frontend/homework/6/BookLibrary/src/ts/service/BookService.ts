import type { Book } from "../models/Book";
import type { BookRespository } from "../repository/BookRepository";


export class BookService {
    private readonly repo: BookRespository;

  constructor(repo: BookRespository) {
    this.repo = repo;
  }

    getAllBooks(): Book[]{
        return this.repo.getAllBooks();
    }

    getBooksByTitleOrAuthor(name: string): Book[]{
        const newName = name.toLocaleLowerCase();
        return this.repo.getAllBooks()
                        .filter(book => book.title.toLocaleLowerCase().includes(newName) || book.author.toLocaleLowerCase().includes(newName));

    }

    getAvailableBooks(): Book[]{
        return this.repo.getAllBooks().filter(book => book.available === true);
    }

    getBooksByYear(startYear: number, endYear: number): Book[]{
        return this.repo.getAllBooks().filter(book =>
            book.year >= startYear && book.year <= endYear
        )
    }
}