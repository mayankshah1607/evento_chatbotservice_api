const express = require('express');
const User = require('../Models/User');
var request = require('request');
const axios = require('axios');

router = express.Router();

router.post('/query', (req,res) => {
    const {eventKey, user, query } = req.body;

    User.findOne({Email: user}, (err, obj) => {
        if (err) {
            res.send({Status: 0})
        }
        else {

            if (obj !== null ) {
                const event = obj.Events.id(eventKey);
                if (event !== null) {
                    axios.post('https://mayankchatbot.herokuapp.com/predict',{
                        query: query
                    })
                    .then((resp) => {
                        User.findOneAndUpdate({Email: user, 'Events._id': eventKey}, {$push: {'Events.$.History': {query: query}}},{new: true,upsert: true}, (err, obj) => {
                            if (err) {
                                console.log(err)
                            }
                            console.log(obj)
                        });
                        res.send({Status: 1 , Reply: event[resp.data.Action]})
                    })
                    .catch(err => {
                        res.send({Status: 0, Message: err})
                    })
                    
                }

                else{
                    res.send({Status: 0, Message: "Invalid API Key for user"})
                }

            }

            else {
                res.send({Status: 0, Messahe: "Invalid user type"});
            }
        }
    })
    .catch(err => {
        res.send({Status: 0, Message: err})
    })
})

router.get('/test', (req,res) => {
    // request({
    //     method: 'POST',
    //     rejectUnauthorized: false,
    //     headers: {
    //         'content-type': 'application/json',
    //         'accept-encoding': "gzip, deflate, br",
    //         'accept-languade': 'en-US,en,q=0.9',
    //         'cache-control': 'no-cache'

    //     },
    //     url: 'https://mayankchatbot.herokuapp.com/predict',
    //     body: JSON.stringify({
    //         query: "What is for food?"
    //     }, (err, resp, body) => {
    //         if (err) {
    //             res.send(err)
    //         }
    //         res.send(body);
    //     })
    // })

    axios.post('https://mayankchatbot.herokuapp.com/predict',{
        query: "What is the food?"
    })
    .then((res) => {
        console.log(res.data.Action)
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router;