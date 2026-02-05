import type { Book } from "../models/Book";
import { Genre } from "../models/Genre";

export const bookData: Book[] = [
    {
        id: 1,
        title: "F1",
        author: "Brad",
        genre: Genre.Adventure,
        year: 2025,
        pages: 178,
        rating: 4.6,
        available: true,
        description: "An adventurous  sports action drama"

},
{
        id: 2,
        title: "F2",
        author: "Anil",
        genre: Genre.Drama,
        year: 2019,
        pages: 135,
        rating: 4,
        available: true,
        description: "A fun filled drama"

},
{
        id: 3,
        title: "F3",
        author: "Anil",
        genre: Genre.Drama,
        year: 2022,
        pages: 150,
        rating: 2.6,
        available: false,
        description: "A boring drama"

},
{
        id: 4,
        title: "F4",
        author: "Russo",
        genre: Genre.Action,
        year: 2025,
        pages: 220,
        rating: 3.5,
        available: true,
        description: "Action packed interesting book"
}

]
