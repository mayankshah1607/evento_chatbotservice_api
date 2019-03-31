const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema  = new Schema({
    EventName: String,
    Organization : String,
    Desc: String,
    get_event_fees: String,
    is_refundable: String,
    get_registration_date: String,
    get_payment_method: String,
    get_prizes: String,
    get_discounts: String,
    greet: String,
    show_schedule: String,
    get_event_date: String,
    get_event_time : String,
    show_accomodation: String,
    show_speakers: String,
    speaker_details_extra: String,
    show_food_arrangements: String,
    get_distance: String,
    get_location: String,
    show_contact_info: String,
    about_chatbot: String
})


const userSchema = new Schema({
    Name:  String,
    Email : String,
    Password: String,
    Events : [eventSchema]
})

const User = mongoose.model('user',userSchema);

module.exports = User;