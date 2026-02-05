import type { Book } from "../../ts/models/Book"
import BookCard from "./BookCard";

interface Props{
    books: Book[];
}

export default function BookList({books}: Readonly<Props>){
    return(
        <div className="book-list">
            {books.map(book => (<BookCard key = {book.id} book = {book}/>))}
        </div>
    )
}