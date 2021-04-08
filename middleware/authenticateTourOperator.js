const jwt = require('jsonwebtoken');
const {secretKey}= require('../config');

const getOrgToken = (tourOperator) => {

    return jwt.sign(
        {
            _id:tourOperator.id,
            name: tourOperator.name,
            email: tourOperator.email,
            password: tourOperator.password,
            address: tourOperator.address,
            phoneNumber: tourOperator.phoneNumber,
            ceoName: tourOperator.ceoName,
         
        }, secretKey, {expiresIn:'48h'}
    )
}

const isOperatorAuth = (req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, secretKey, (err, decode)=> {
            if(err){
                return res.status(401).send({msg:"Invalid Token"});
            }
            req.tourOperator = decode;
            next();
            return;
        });
    } else { return res.status(401).send({ msg:"Token is not supplied."})}
};




module.exports = {getOrgToken, isOperatorAuth};