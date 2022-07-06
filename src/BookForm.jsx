import React from "react";
import { useState } from "react";

const BookForm = () => {
    const API_URL = 'https://shark.ontrack.global';
    const [form, setForm] = useState({author: '', title:'', description: '', subject: '', year: ''});

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value,
        });
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (form.title.length > 0 && form.author.length > 0 && form.description.length > 0 && form.subject.length > 0 && form.year.length > 0 && !isNaN(form.year)){
          createBook(form)
          setForm({author: '', title:'', description: '', subject: '', year: ''})
        }
    }

    const createBook = async (book) => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book)
      };
      console.log(book)
      console.log(requestOptions.body)
      const response = await fetch(`${API_URL}/book/create`,requestOptions) 
      const data = await response.text();
      console.log(data)
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor = "title" >Titulo: </label>
            <input type = "text" id = "title" name = "title" value = {form.title} onChange= {handleChange}></input>
            <br/>
            <br/>
            <label htmlFor = "author" >Autor: </label>
            <input type = "text" id = "author" name = "author" value = {form.author} onChange= {handleChange}></input>
            <br/>
            <br/>
            <label htmlFor = "description" >Descripción: </label>
            <input type = "text" id = "description" name = "description" value = {form.description} onChange= {handleChange}></input>
            <br/>
            <br/>
            <label htmlFor = "subject" >Tema: </label>
            <input type = "text" id = "subject" name = "subject" value = {form.subject} onChange= {handleChange}></input>
            <br/>
            <br/>
            <label htmlFor = "year" >Año de Publicación: </label>
            <input type = "text" id = "year" name = "year" value = {form.year} onChange= {handleChange}></input>
            <br/>
            <input type = "submit"></input>
        </form>
    )
}

export default BookForm;