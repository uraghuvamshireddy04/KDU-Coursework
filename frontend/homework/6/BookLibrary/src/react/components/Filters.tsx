interface Props{
    search: string;
    setSearch: (value: string) => void;
    rating: number;
    setRating: (value: number)=> void;
    genre: string;
    setGenre: (value: string)=> void;

}

export default function Filter({search, setSearch, rating, setRating, genre, setGenre}: Readonly<Props>){
    return(
        <div className="filters">
            <input type="text" placeholder="Search By title or author" value={search} onChange={e => setSearch(e.target.value)}/>
            <input type="number" placeholder="Enter Rating from 1 to 5" value={rating} onChange={e=> setRating(Number(e.target.value))} />
            <select onChange={e=>setGenre(e.target.value)}>
                <option value="all">All</option>
                <option value="Action">Action</option>
                 <option value="Drama">Drama</option>
                <option value="Adventure">Adventure</option>
                <option value="Horror">Horror</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Biopic">Biopic</option>
                <option value="Thriller">Thriller</option>

            </select>
        </div>
    )
}