require("dotenv").config;
const jwt = require("jsonwebtoken");

const authenticateToken = async(req,res,next) =>{

    // To get token we need headers(Token come from headers). we need "authorization" header that has format "Bearer Token"
    // const authHeader = req.headers["authorization"];
    // console.log(authHeader);

    // Spliting on space because "Bearer Token" ==> 0=Bearer 1=TOKEN
    // const token = authHeader && authHeader.split(" ")[1];

    const token = req.cookies.accessToken;
    // console.log(token);

    if(token == null)
    {
        return res.redirect("/login");
    }

    // jwt.verify() is a function used to verify a JSON Web Token (JWT) in Node.js.
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
    //     if(err) return res.sendStatus(403)  // Froebidden: Mean have a token but token is no longer valid and has no access. You are not authorized to access this resource, even if you provide valid credentials.
    //     req.user = user;
    //     next();
    // })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err)
        {
            console.log(err);
        }
            next();      
    });

};

module.exports = {authenticateToken};