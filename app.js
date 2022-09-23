const { json } = require('express');
const express = require('express')
const connectDB = require('./connectDB/connect');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');
const notFound = require('./middleware/not-found');
require("dotenv").config()
require("express-async-errors");
const authRouter = require('./routers/auth')
const postsRouter = require("./routers/post");
const app = express();

const port = process.env.PORT;
// middleware
app.use(json())



// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postsRouter);

// routes
app.get('/', (req,res)=>{
    res.send("you are all set")
})

// errors middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async()=>{
     try {
       await connectDB(process.env.MONGO_URI);
       app.listen(port, console.log(`server running on port ${port}`));
     } catch (error) {
       console.log(error);
     }
}
start();