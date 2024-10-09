const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/fullStackBeckend'


const connectToDb =async()=>{
   await mongoose.connect(mongoURI)
   console.log('connected to Database')
}

module.exports= connectToDb

