const express = require('express')
const connectToDb = require('./config/db')
const authRouter = require('./routes/auth.route')
const productRouter = require('./routes/product.route')
const app = express()
const port = 2222
app.use(express.json())




//routes
app.use('/user',authRouter)
app.use('/product',productRouter)


app.listen(port,()=>{
    console.log("server started")
    connectToDb()
})