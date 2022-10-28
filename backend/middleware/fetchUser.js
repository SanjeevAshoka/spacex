const jwt = require('jsonwebtoken');
const JWT_secret = 'sanjeev@';

const fetchuser = (req,res, next)=>{
    // get user from jwt tocken & append id to req object.
    console.log("fetchuser ");
    const tocken = req.header('auth-tocken');
    if(!tocken) {
        res.status(401).send({error: "Please authenticate with valid tocken"});
    }
    try{
        const data  = jwt.verify(tocken, JWT_secret);
        req.user = data.user;
        next();
    }
    catch(error){
        res.status(401).send({error: "Please authenticate with valid tocken"});
    }
   
}

module.exports = fetchuser;