// const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const landing_page = (req,res) => {
    res.render("landing");
};



const login_get = (req,res)=>{
    res.render("login");
};

const login_post =  async(req,res) => {
    const {email, password} = req.body;
    
    const user = await userModel.findOne({email}); // Retrieve a single document that matches email.
    // console.log(user);

    if(!user){
        res.write("<h1>No user under this Email</h1>");
        res.write("<a href='/register'>Register</a>");
        res.end();
        return;
    }

    // const hasdPsw = await bcrypt.hash(password, 10);
    const isMatch = await (user.password == password);
    // console.log(isMatch);
    

    if(!isMatch){
        res.write("<h1>Invalid Password!</h1>");
        res.write("<a href='/login'>Login</a>");
        res.end();
        return;
    }

    // console.log(user);
    const userToken = user.toObject(); // Convert the document to a plain object. Pass the plain object as the payload for the operation.
    // console.log(userToken);
    
    // jwt.sign() is a function used to generate a JSON Web Token (JWT) in Node.js.
    // The jwt.sign() function takes in a payload (which is the data you want to transmit), a secret key, and some optional settings, and generates a unique token that includes the payload and a digital signature that verifies that the token hasn't been tampered with.
    const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET);
    // console.log(accessToken);

    // Send as cookie.
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: 'strict'});

    // res.set('Authorization', `Bearer ${accessToken}`);
    // The Authorization header can be used to send a JWT token in HTTP requests, but it cannot be used to pass data between pages through redirects.
    // When you issue a redirect response, the client's browser will make a new HTTP request to the specified URL, and this request will not include any headers that were set in the previous response.

    res.redirect("/dashboard");
};



const register_get =  (req,res)=>{
    res.render("register");
};

const register_post =  async(req,res)=>{
    const { username, email, password } = req.body;

    let user = await userModel.findOne({email});

    if(user){
        res.write("<h1>User already exist under this email!</h1>");
        res.write("<a href='/login'>Login</a>");
        res.end();
        return;
    }

    // const hashPassword = await bcrypt.hash(password,10);

    const newUser = new userModel({
        username,
        email,
        password
    });

    await newUser.save();
    res.redirect("/login");

};



const dashboard_get = (req,res)=>{
    res.render("dashboard");
};


const logout_post = async(req,res) =>{
    await res.clearCookie("accessToken");
    res.redirect("/");
};


module.exports = { landing_page , login_get , login_post , register_get , register_post , dashboard_get , logout_post};