const {verify} = require("jsonwebtoken");

const validateToken = (req,res,next) =>{
    const accessToken = req.header("accessToken");
    
    if(!accessToken) return res.json({ error : "user not login"});
    // payload

    try{
        const validToken =verify(accessToken,"important");

        if(validToken){
            return next();
        }
    } catch(err){
        return res.json({ error: err})
    }
};

module.exports = {validateToken};