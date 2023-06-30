const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());



const sessionRoutes = require("./routes/sessionRoutes");
app.use("/", sessionRoutes);



app.listen(3000,()=>{
    console.log("Server running at port 3000");
});