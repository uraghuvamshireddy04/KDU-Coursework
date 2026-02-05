import { useState } from 'react';
import './App.css'
import BookList from './react/components/BookList';
import Stats from './react/components/Stats';
import { BookRespository } from './ts/repository/BookRepository'
import { BookService } from './ts/service/BookService'
import Filter from './react/components/Filters';

const service = new BookService(new BookRespository());
function App() {

  const [search, setSearch] = useState("");
  const [rating, setRating] = useState(0);
  const [genre, setGenre] = useState('all');
  let filteredBooks = service.getBooksByTitleOrAuthor(search).filter(book => book.rating >= rating);
  if(genre !== 'all'){
    filteredBooks = filteredBooks.filter(book => book.genre === genre);
  }
  return (
    <div>
      <h1 className='main-title'>Book-Library</h1>
      <div className="componnets">
      <Filter search={search} setSearch={setSearch} rating={rating} setRating={setRating} genre = {genre} setGenre={setGenre} />
      <Stats books = {filteredBooks} />
      {
        filteredBooks.length > 0 ? <BookList books={filteredBooks} /> : <p className='no-books'>No Books available to show</p>
      }
      </div>
    </div>
  )
}

export default App
