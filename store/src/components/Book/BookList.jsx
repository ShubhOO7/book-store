import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './Book';
import "./Book.css";

const URL = "https://storebackend-jeri.onrender.com/books";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
};
function BookList() {
    const [books, setBooks] = useState();
    useEffect(() => {
        fetchHandler().then((data) => setBooks(data.books));
    }, []);

    // console.log(books);
    return (
        <div>
            <ul>
                {books && books.map((book, index) => (
                    <div className='book' key={index}>
                        <Book book={book} />
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default BookList