import express, { request, response } from "express";
import cors from 'cors';
import {PORT, mongoDBURL} from "./configure.js"
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from './routes/booksRoutes.js'

const app = express();
//middleware for parsing request body
app.use(express.json())

//middleware for handling CORS policy
//option 1: Allow All Origins qith Default of cors(*)
app.use(cors())

//Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// )

app.get('/', (request,response)=>{
    console.log(request)
    return response.status(234).send('welcome jana')
})

app.use('/books',booksRoutes)

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database");
    app.listen(PORT, ()=>{
        console.log('App is listening to port: ${PORT}');
    })
    
})
.catch((error)=>{
    console.log(error);
});
