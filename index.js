const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());

require('dotenv').config();

const allowCrossDomain = function(req, res, next) {

    var allowedOrigins = ['http://localhost:3000'];

    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Connection','keep-alive');
    res.header('Keep-Alive','timeout=200');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, captchaCookie");
    res.header('content-type', 'application/json');
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        var headers = {
            "Access-Control-Allow-Methods" : "GET, POST, OPTIONS",
            "Access-Control-Allow-Credentials" : true
        };
        res.writeHead(200, headers);
        res.end();
    } else {
        next();
    }
}

mongoose.connect(process.env.MONGO_DB_URL, (err) => {
    err ? console.log(err) : console.log("Successfully connected to the database!");
},
{useNewUrlParser: true}
);

app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(cookieParser());
app.use('/data',require('./Routes/data'));
app.use('/auth',require('./Routes/auth'));

app.listen(port, () => {
    console.log('App listening on ',port);
})