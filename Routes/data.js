const express = require('express');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

router = express.Router();

router.post('/addevent', (req,res) => {
    const decoded = jwt.verify(req.cookies.evento.token,process.env.JWT_KEY);
    const id = decoded.id;

    User.find({_id: id}, (err, obj) => {
        if (err) {
            res.send({Status: 0, Message: err})
        }

        else {
            if (obj.length === 0 ){
                res.send({Status: 0, Message: "Not found"});
            }


            else {
                User.update({_id: id}, {$push: {Events: req.body}},{upsert: true}, (err)=> {
                    if (err) {
                        console.log(err)
                        res.send({Status: 0})
                    }
                    else {
                        res.send({Status:1})
                    }
                })
            }
        }
    })
})

module.exports = router;