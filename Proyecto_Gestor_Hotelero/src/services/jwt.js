'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secretKey = 'llave';

exports.createToken = async(user)=>{
    try{
        if(user.role == 'ADMIN'){
            const payload = {
                sub: user._id,
                name: user.name,
                role: user.role,
                iat: moment().unix(),
                exp: moment().add(5, 'hour').unix()
            }
            return jwt.encode(payload, secretKey);
        }else if(user.role == 'MANAGER'){
            const payload = {
                sub: user._id,
                name: user.name,
                role: user.role,
                iat: moment().unix(),
                exp: moment().add(5, 'hour').unix()
            }
            return jwt.encode(payload, secretKey);
        }else{
            const payload = {
                sub: user._id,
                name: user.name,
                lastname: user.lastname, 
                email: user.email, 
                phone: user.phone,
                username: user.username,
                role: user.role,
                iat: moment().unix(),
                exp: moment().add(5, 'hour').unix()
            }
            return jwt.encode(payload, secretKey);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}