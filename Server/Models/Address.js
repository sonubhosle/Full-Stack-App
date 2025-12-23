const mongoose = require('mongoose');



const addressSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [' Please Enter Name ', true]
    },
    surname: {
        type: String,
        required: [' Please Enter Surame ', true]
    },
    landmark: {
        type: String,
        required: [' Please Enter Your Landmark ', true]
    },
    city: {
        type: String,
        required: [' Please Enter Your City ', true]
    },
    state: {
        type: String,
        required: [' Please Enter Your State ', true]
    },
    pincode: {
        type: Number,
        required: [' Please Enter Your Pincode ', true]
    },
    email: {
        type: String,
        required: [' Please Enter Your Email ', true]
    },
    mobile: {
        type: String,
        required: [' Please Enter Your Mobile Number ', true]
    },
    country: {
        type: String,
        required: [' Please Enter Your Country ', true]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }


})

const Address = mongoose.model('addresses', addressSchema);

module.exports = Address;