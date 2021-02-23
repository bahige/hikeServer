const jwt = require('jsonwebtoken');
const {secretKey}= require('../config');

const getToken = (user) => {

    return jwt.sign(
        {
            _id:user.id,
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            isAdmin: user.isAdmin,
        }, secretKey, {expiresIn:'48h'}
    )
}

const isAuth = (req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, secretKey, (err, decode)=> {
            if(err){
                return res.status(401).send({msg:"Invalid Token"});
            }
            req.user = decode;
            next();
            return;
        });
    } else { return res.status(401).send({ msg:"Token is not supplied."})}
};

const isAdmin = (req,res, next) =>{
    if(req.user && req.user.isAdmin){
        return next();
    }

    return res.status(401).send({msg:"Admin Token is invalid"});
}

module.exports = {getToken, isAuth, isAdmin};