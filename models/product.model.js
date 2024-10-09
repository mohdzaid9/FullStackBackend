const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{type:String,requied:true},
    price:{type:Number,requied:true},
    rating:{type:Number,default:1},
    desc:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user"}
},{
    timestamps:true,
    versionKey:false
}
)

const productModel = mongoose.model("product",productSchema)
module.exports = productModel