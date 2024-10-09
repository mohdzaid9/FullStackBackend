const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const authSchema = new mongoose.Schema({
    name:{type:String,requied:true},
    password:{type:String,requied:true},
    email:{type:String,required:true,unique:true},
    product:[{type:mongoose.Schema.Types.ObjectId, ref:"product"}]
    
},{
    timestamps:true,
    versionKey:false
})

try{
    authSchema.pre('save',async function (next) {   
        if(!this.isModified('password')){
            next()
        }
        
            //generate salt
            const salt = await bcrypt.genSalt(10)
         
            //hashing the password via salt
            this.password = await bcrypt.hash(this.password,salt)
    
            //continoue with this operation
            next()
     
    })
}catch(err){
    console.log('some error occured in hashing')
}

const authModel = mongoose.model("user",authSchema)
module.exports = authModel