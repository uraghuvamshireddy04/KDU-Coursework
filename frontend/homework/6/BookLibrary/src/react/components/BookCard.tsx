import type { Book } from "../../ts/models/Book"

interface Props {
    book: Book;
}

export default function BookCard({book}: Readonly<Props>){
    return(
    <div className={`book-card ${book.available ? "available" : "unavailable"}`}>
        <p>Title: {book.title}</p>
        <p>Author: {book.author}</p>
        <p>Genre: {book.genre}</p>
        <p>Rating: {book.rating}</p>
        <p >Status: <span className="status">{book.available ? "Available" : "Not Available"}</span></p>
    </div>
    )
}