const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const isAuth = (req,res,next)=>{
try{
    let {token} = req.query
    let decoded = jwt.verify(token,"SecretKey")
    console.log(decoded)
     if(decoded){
        next()
    }
}catch(err){
    res.json({msg:"error in auth middleware",err}).status(401)
}
}

module.exports=isAuth