const { json } = require('express');
const express = require('express')
const connectDB = require('./connectDB/connect');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');
const notFound = require('./middleware/not-found');
require("dotenv").config()
require("express-async-errors");
const authRouter = require('./routers/auth')
const postsRouter = require("./routers/post");
// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const app = express();

const port = process.env.PORT;

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(json());
app.use(helmet());
app.use(xss());
app.use(cors());



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