import React, { useState } from "react";
import Book from './Book'
import BookForm from './BookForm'


const API_URL = 'https://shark.ontrack.global/api';
//const API_URL = 'http://localhost:8080';

const App = () => {

    const [books, setBooks] = useState([]);
    const [searchedBook, setSearchedBook] = useState(null);
    const [searchId, setSearchId] = useState("");
    const [wordReport, setWordReport] = useState("");

    const searchBooks = async () => {
        const response = await fetch(`${API_URL}/book/get`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        })
        const data = await response.json();
        setBooks(data)
    }

    const searchBook = async (bookId) => {
        {
            const response = await fetch(`${API_URL}/book/get/${bookId}`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
            })
            const data = await response.json();
            setSearchedBook(data[0])
        }
    }

    const downloadReport = async (word) => {
        const response = await fetch(`${API_URL}/book/report/${word}`, {
            method: 'GET',
        })
        const data = await (await response.text()).slice(17);
        console.log(data)
        window.open(`${API_URL}/book/report/download/${data}`)
        //const response2 = await fetch(`${API_URL}/book/report/download/${data}`)

    }

    return (
            <div>
                <div>
                    <div className="text-center">
                        <header class = "p-3 bg-dark text-white">
                            <h1 className="fw-light"> Libreria </h1>
                        </header>

                    </div>
                    <br/>
                    <br/>
                    <div className="text-center">
                        <h2 className="fw-light">Obtener Todos</h2>
                        <button type="button" className ="btn btn-primary mx-2"
                            onClick={() => searchBooks()}
                        >Buscar Todos los Libros</button>
                        <button type="button" className ="btn btn-secondary"
                            onClick={() => setBooks([])}
                        >Limpiar</button>
                        {
                            books?.length > 0 ? (
                                <div className="row" >
                                    {books.map((book) => (
                                        <Book book={book} />
                                    ))}
                                </div>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                    <br/>
                    <br/>
                    <div align = "center">
                        <h2 className="fw-light" >Obtener Libro por Id</h2>
                        <input
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            placeholder="Ingrese el id del libro"
                            className=" mx-2 input-group-text mb-3"
                        />
                        <button
                            className="btn btn-primary mx-2"
                            onClick={() => searchBook(searchId)}
                        >Buscar</button>
                        {
                            searchedBook !== null ? (<Book book={searchedBook} />) : (<></>)
                        }
                    </div>
                    

                    <br/>
                    <br/>
                    
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4 p-3 border border-primary border-5">
                            <h2 className="fw-light" align = "center">Crear Un Libro</h2>
                            <BookForm />
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="mb-5" align = "center">
                        <h3 className="fw-light">Libros por palabra clave</h3>
                        <input
                            value={wordReport}
                            onChange={(e) => setWordReport(e.target.value)}
                            placeholder="Ingrese la palabra clave"
                            className="input-group-text mb-3"
                        />
                        <br />
                        <button
                            className="btn btn-primary"
                            onClick={() => downloadReport(wordReport)}
                        >Generar Reporte</button>


                    </div>
                </div>
            </div>
    )
}

export default App;