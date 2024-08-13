import express from 'express'
import mysql from "mysql"
import cors from 'cors'
import multer from 'multer'
import path from 'path'

require('dotenv').config();
const app = express()

app.use(express.json())
app.use(cors('http://localhost:3000/'))
app.use(express.static('public'))

const storage = multer.diskStorage({
	destination:(req, file, cb) =>{
		cb(null, 'public/images')
	},
	filename :(req,file,cb) =>{
		cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({
	storage : storage
})
	


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get("/",(req,res)=>{
	res.json("Hello this is the backend")
})

app.get("/books",(req,res)=>{
	const q = "SELECT * FROM books"
	db.query(q,(err,data)=>{
		if(err) return res.json(err)
		return res.json(data)
	})
})

app.post("/books", upload.single('image') ,(req,res)=>{
	const cover = req.file.filename;
	
	const q = "INSERT INTO books(`title`,`desc`,`cover`,`price`) VALUE (?)"
	const values = [
		req.body.title,
	 	req.body.desc, 
	 	cover,
		req.body.price
	]

	db.query(q,[values],(err,data)=>{
		if(err) return res.json(err)
		return res.json("book has been created successfully")
	})

	// console.log(req.body)
	// console.log(req.file)
})

app.delete('/books/:id',(req,res)=>{
	const bookID = req.params.id

	const q = "DELETE FROM books WHERE id= ?"

	db.query(q,[bookID],(err,data)=>{
		if(err) return res.json(err)
		return res.json("Book have been deleted")
	})
})

app.put('/books/:id',(req,res)=>{
	const bookID = req.params.id

	const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

	const values = [
		req.body.title,
		req.body.desc, 
		req.body.price,
	   	req.body.cover,
	]

	db.query(q,[...values,bookID],(err,data)=>{
		if(err) return res.json(err)
		return res.json("Book have been updated")
	})
})

app.listen(8800, () =>{
	console.log("Connected to backend!")
})