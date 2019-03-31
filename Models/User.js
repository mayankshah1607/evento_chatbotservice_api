const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema  = new Schema({
    Name: String,
    Organization : String,
    Desc: String,
    0: String,
    1: String,
    2: String,
    3: String,
    4: String,
    5: String,
    6: String,
    7: String,
    8: String,
    9: String,
    10: String,
    11: String,
    12: String,
    13: String,
    14: String,
    15: String,
    16: String
})


const userSchema = new Schema({
    Name:  String,
    Email : String,
    Password: String,
    Events : [eventSchema]
})

const User = mongoose.model(userSchema,'user');

module.exports = User;