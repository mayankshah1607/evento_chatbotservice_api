const express = require('express');
const User = require('../Models/User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req,res) => {
    const {Email, Password} = req.body;

    User.findOne({Email: Email}, (err,obj) => {
        if (err) {

            res.send({Status: 0, Message: "User not found"})
        }

        else {

            if (obj !== null) {
                bcrypt.compare(Password, obj.Password, (err,result) => {
                    if (err) {
                        res.send({Status: 0,Message: "Error with bcrypt"})
                    }
                    else {
                        if (result) {
                            const token = jwt.sign({
                                id: obj._id
                            },process.env.JWT_KEY,{expiresIn:'1h'})
                            

                            res.cookie('evento',{
                                token: token
                            })


                            res.send({Status: 1,Message: "Authenticated", data: {
                                Name: obj.Name,
                                Events: obj.Events
                            }})
                        }
                        else{
                            res.send({Status: 0,Message: "Wrong password"})
                        }
                    }
                })

            }
            else {
                res.send({Status : 0, Message: "Invalid user"})
            }
        }
    })
})

router.post('/signup', (req,res) => {
    const {Name, Email, Password} = req.body;
    bcrypt.hash(Password,null,null, (err,hash) => {
        if (err) {
            res.send({Status: 0, Message: "Error in hashing"})
        }
        else {
            User.create({
                Name: Name,
                Email: Email,
                Events: [],
                Password: hash
            })
            .then(data => {
                res.send({Status: 1, Message: "User created"})
            })
            .catch(err => {
                res.send({Status: 0, Message: "Sign up failed"})
            })
        }
    })
})

router.get('/logout',(req,res) => {
    res.clearCookie('evento');
})

module.exports = router;

