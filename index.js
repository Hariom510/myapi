const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const jsonData = require("./routes/quiz.json");
const marvelData = require("./routes/marvel.json");
const PORT = process.env.PORT || 5000

dotenv.config();          //to work with .env file
app.use(express.json());  //to work with json

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    // autoIndex: true,  //make this also true
}).then(()=>{
    console.log("Successfully connected to mongodb");
}).catch((err)=>{
    console.log(err); 
})

// app.use("/", (req,res)=>{
//     console.log("I am from home route");
// })

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

app.get("/api/quiz", (req,res)=>{
    res.json(jsonData);
})

app.get("/api/marvel", (req,res)=>{
    res.json(marvelData);
})
// app.use("/api/quiz", jsonData);

// console.log("json data is: "+ JSON.stringify(jsonData, "undefined", "\t"));

app.listen(PORT, ()=>{
    console.log("Backend is running");
})