import React from "react";

const Book = ({ book}) => {
    return (
        <div>
            <h3>Title: {book.Title}</h3>
            <h4>Author: {book.Author}, Year Published: {book.PublicationYear}</h4>
        </div>
    )
}

export default Book; 