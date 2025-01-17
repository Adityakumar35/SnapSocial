const jwt = require("jsonwebtoken");
const {JWT_KEY} = require("../keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization === Bearer efnfklejfweoi(token)
    if(!authorization){
        return res.status(401).json({error:"You must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token , JWT_KEY,  (err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next() // use next here as it will apply next only after the user id is found
        })
    })
}