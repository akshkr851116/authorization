const express = require("express");
const jwt = require('jsonwebtoken');
const privateKey="privateKey"
const app=express()

app.get("/",(req,res)=>{
res.json({
    message:"A sample Api"
})
})



app.post("/login",(req,res)=>{
  const user={
    id:1,
    username:"Akash Singh",
    email:"akshkr5@gmail.com"
  }
  jwt.sign({user}, privateKey, { expiresIn: '1h' }, (err, token)=>{
    res.json({token})
    

  });

})
app.post("/profile",verifyToken,(req,res)=>{
    jwt.verify(req.token,privateKey,(error,authData)=>{
        if(error){
            res.send({result:"Invaild Token"})
        }
        else 
        res.json({
    message:"profile acc",authData
        })

    })

})
function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization']
    if(typeof bearerHeader!=="undefined"){
        const bearer=bearerHeader.split(" ")
        const token=bearer[1]
        req.token=token
        next();
    }
    else{
        res.send({
            result:"Token is not Valid"
        })
    }
  
}



app.listen("5000",()=>{
    console.log(("Server Is Running at http://localhost:5000"));
    
})
// http://localhost:5000/login
// http://localhost:5000/profile