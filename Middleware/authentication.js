const jwt = require('jsonwebtoken');

const secret_key = "shantanubose";
 function authentication(req,res,next){
    const authorization = req.headers['authorization'];
    const token = authorization.split(' ').pop();
    
    if(!token){
        res.status(400).send({error : "unauthorised access"});
    }
    else{
        try{
            jwt.verify(token, secret_key);
            const user = jwt.decode(token);
            req.user = user;
            next();
        }
        catch(err){
            res.status(400).send({error : err.message})
        }
    }
    
}
module.exports = authentication;