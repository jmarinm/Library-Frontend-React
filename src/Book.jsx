import React from "react";

const Book = ({ book }) => {
    return (
        <div className="card mx-4 my-2" style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">{book.Title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.PublicationYear}</h6>
                <p className="card-text">{book.Description}</p>
            </div>
        </div>
    )
}

export default Book; 