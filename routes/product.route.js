const express = require('express')
const productRouter = express.Router()
const bcrypt = require('bcrypt')
const productModel = require('../models/product.model')
const isAuth = require('../middlewares/authMiddleware')



//create
productRouter.post('/',isAuth,async(req,res)=>{
    let data = req.body
    let userData = await productModel.create(data)
     return res.json({msg:userData}).status(201)
    
})

//read
productRouter.get('/',async(req,res)=>{
  try{
    let data = req.body
    let userData = await productModel.find().populate("user")
     return res.json({msg:userData}).status(200)
  }catch(err){
    res.json({msg:err}).status(402)
  }
    
})

//update
productRouter.put('/:id',isAuth,async(req,res)=>{
    let id = req.params.id
    console.log(id)
    let userData = await productModel.findByIdAndUpdate(id)
     return res.json({msg:userData})
    
})

//delete
productRouter.delete('/:id',isAuth,async(req,res)=>{
    try{

    let id = req.params.id
    let userData = await productModel.findByIdAndDelete(id)
     return res.json({msg:`${userData.title} deleted successfully`})
    }catch(err){
        res.json({msg:err}).status(400)
        
    }
    
})

module.exports=productRouter