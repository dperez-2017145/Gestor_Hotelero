"use strict"

const jwt = require("jwt-simple");
const secretkey = "llave";

exports.isLoged = async (req, res, next) => {
    if(req.headers.authorization){
        try {
            let token = req.headers.authorization.replace(/['",]+/g, '');
            let payload = jwt.decode(token, secretkey);
            req.user = payload;
            next();
        } catch (err) {
            console.log(err);
            return err;
        }
    }else{
        return res.status(401).send({message: "The request does not contain the authentication header."});
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        const user = req.user;
        if(user.role === "ADMIN"){
            next();
        }else{
            return res.status(403).send({message: 'User unauthorized'});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.isManager = (req, res, next) => {
    try {
        const user = req.user;
        if(user.role === "MANAGER"){
            next();
        }else{
            return res.status(403).send({message: 'User unauthorized'});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.isClient = (req, res, next) => {
    try {
        const user = req.user;
        if(user.role === "CLIENT"){
            next();
        }else{
            return res.status(403).send({message: 'User unauthorized'});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}