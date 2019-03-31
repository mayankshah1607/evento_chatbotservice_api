const express = require('express');
const User = require('../Models/User');

router = express.Router();

router.post('/addevent', (req,res) => {
    console.log(req.body)
})

module.exports = router;