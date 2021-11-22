require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");

mongoose.connect(process.env.MONGO_URL,  (error)=>{
    if(error){
        console.log(error)
    }
})
mongoose.Promise = global.Promise;

app.use("/user", express.json(), userRouter);
app.use("/admin", express.json(), adminRouter);

app.listen(process.env.PORT, ()=>{
    console.log("Server running..")
})