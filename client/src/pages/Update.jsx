import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
	const [book, setBook] = useState({
		title:"",
		desc:"",
		price:null,
		cover:""
	})

	const navigate = useNavigate()
	const location = useLocation()
	const bookId = location.pathname.split("/")[2]

	const handleChange = (e) =>{
		setBook((prev) =>({...prev,[e.target.name]: e.target.value}))
	}

	const handleClick = async(e) =>{
		e.preventDefault()

		try{
			await axios.put(`http://localhost:8800/books/${bookId}`, book)
			navigate('/')
		}catch(err){
			console.log(err)
		}
	}

	return (
		<div className='form'>
			<h1>Update the Book</h1>
			<input type='text' placeholder='title' name='title' onChange={handleChange}></input>
			<input type='text' placeholder='desc' name='desc' onChange={handleChange}></input>
			<input type='number' placeholder='price' name='price' onChange={handleChange}></input>
			<input type='text' placeholder='cover' name='cover' onChange={handleChange}></input>
			<button onClick={handleClick} className='formButton'>Update book</button>
		</div>
	)
}

export default Update