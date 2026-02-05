import type { Book } from "../../ts/models/Book"

interface Props{
    books: Book[]
}

export default function Stats({books}: Readonly<Props>){
    const available = books.filter(book => book.available === true);
    const unavailable = books.length - available.length;
    return(
        <div className="stats">
            <p>Total Books: {books.length}</p>
            <p>Available Books: {available.length}</p>
            <p>Unavailable Books: {unavailable}</p>
        </div>
    )
}