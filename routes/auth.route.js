const express = require('express')
const authModel = require('../models/auth.model')
const authRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



//registering 
authRouter.post('/register',async(req,res)=>{
 try{
    let data = req.body
    let userData = await authModel.create(data)
     return res.json({msg:userData}).status(200)
 }
   catch(err){
    res.send("don't register again you are already registerd").status(500)
 }
    
})



//login
authRouter.post('/login',async(req,res)=>{
    let {email , password} = req.body
    try{
    let user = await authModel.findOne({email})
    if(!user){
        return res.status(404).send('not found please register')
    }
    const isMatch = bcrypt.compare(user.password,password,function(err, result) {
        if (result) {
            // Passwords match
            console.log('Passwords match');
        } else {
            // Passwords do not match
            console.log('Passwords do not match',err);
        }
    })
   
    let token = jwt.sign({email},"SecretKey")

    res.json({msg:`${user.name} is logged in` , token}).status(200)
    }
    
    catch(err){
     return console.log("some error in login",err)
    }
    
})


//reading a user
authRouter.get('/',async(req,res)=>{
    let data = req.body
    let userData = await authModel.find().populate("product")
    res.json({msg:userData})
})

// //updating a user
// authRouter.put('/:id',async(req,res)=>{
//     let id = req.params.id
//     let userData = await authModel.findByIdAndUpdate(id)
//     res.json({msg:userData})
// })

// //deleting a user
// authRouter.delete('/:id',async(req,res)=>{
//     let id = req.params.id
//     let userData = await authModel.findByIdAndDelete(id)
//     res.json({msg:"user deleted successfully"})
// })



module.exports= authRouter