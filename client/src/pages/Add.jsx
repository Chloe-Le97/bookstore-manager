import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Add = () => {
	const [book, setBook] = useState({
		title:"",
		desc:"",
		price:null,
		cover:null
	})
	const [file,setFile] = useState(null)

	const navigate = useNavigate()

	const handleChange = (e) =>{
		setBook((prev) =>({...prev,[e.target.name]: e.target.value}))
	}

	const handleFile = (e) =>{
		// console.log(e.target.files[0])
		setFile(e.target.files[0])
	}

	const handleClick = async(e) =>{
		e.preventDefault()
		
		const formData = new FormData();
		formData.append('image', file);
		formData.append('title', book.title);
		formData.append('desc', book.desc);
		formData.append('price', book.price);

		try{
			await axios.post('http://localhost:8800/books', formData)
			navigate('/')
		}catch(err){
			console.log(err)
		}
	}

	return (
		<div className='form'>
			<h1>Add New Book</h1>
			<input type='text' placeholder='title' name='title' onChange={handleChange}></input>
			<input type='text' placeholder='desc' name='desc' onChange={handleChange}></input>
			<input type='number' placeholder='price' name='price' onChange={handleChange}></input>
			<input type='file' onChange={handleFile}/>
			<button onClick={handleClick} className='formButton'>Add book</button>
		</div>
	)
}

export default Add