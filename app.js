const { json } = require('express');
const express = require('express')
const connectDB = require('./connectDB/connect');
const notFound = require('./errors/not-found');

const app = express();

// middleware
app.use(json())
app.use(notFound);
app.use(errorHandlerMiddleware);



// routes
app.get('/', (req,res)=>{
    res.send("you are all set")
})


const start = async()=>{
    await connectDB();
    app.listen(process.env.PORT)
}
start();