import React, { useState } from "react";
import Book from './Book'
import BookForm from './BookForm'


const API_URL = 'https://shark.ontrack.global';
//const API_URL = 'http://localhost:8080';

const App = ()=> {

    const [books, setBooks] = useState([]);
    const [searchedBook, setSearchedBook] = useState(null);
    const [searchId, setSearchId] = useState("");
    const [wordReport, setWordReport] = useState("");

    const searchBooks = async () =>{
    const response = await fetch(`${API_URL}/book/get`,{
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        }) 
    const data = await response.json();
    setBooks(data)
    }

    const searchBook = async (bookId) =>{{
        const response = await fetch(`${API_URL}/book/get/${bookId}`,{
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            }) 
        const data = await response.json();
        setSearchedBook(data[0])
        }}

    const downloadReport = async(word) => {
        const response = await fetch(`${API_URL}/book/report/${word}`,{
            method: 'GET',
        })
        const data = await (await response.text()).slice(17);
        console.log(data)
        window.open(`${API_URL}/book/report/download/${data}`)
        //const response2 = await fetch(`${API_URL}/book/report/download/${data}`)

    }

    return (
        <>
        <div>
            <h1>Libros</h1>
        </div>
        <div>
            <h2>Obtener Todos</h2>
            <button
                onClick={ () => searchBooks()}
            >Buscar Todos los Libros</button>
            <button
                onClick = { () => setBooks([])}
            >Limpiar</button>
            {
                books?.length > 0 ? (
                    <div>
                        {books.map((book)=> (
                            <Book book = {book}/>
                        ))}
                    </div>
                ) : (
                    <></>
                )
            }   
        </div>
        <div>
            <h2>Obtener Libro por Id</h2>
            <input
            value = {searchId}
            onChange = {(e)=> setSearchId(e.target.value)}
            placeholder= "Ingrese el id del libro"
            />
            <button
                onClick = {() => searchBook(searchId)}
            >Buscar</button>
            {
                searchedBook !== null ? (<Book book = {searchedBook}/>): (<></>)
            }
        </div>
        <div>
            <h2>Crear Un Libro</h2>
            <BookForm />
        </div>
        <div>
            <h2>Reportes</h2>
            <h3>Libros por palabra clave</h3>
            <input
            value = {wordReport}
            onChange = {(e)=> setWordReport(e.target.value)}
            placeholder= "Ingrese la palabra clave que desea buscar"
            />
            <br/>
            <button
                onClick = {() => downloadReport(wordReport)}
            >Generar Reporte</button>


        </div>
        </>
    )
}

export default App;