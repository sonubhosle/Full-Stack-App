const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Enter Your Name"] },
    surname: { type: String, required: [true, "Enter Your Surname"] },
    photo: { type: String, required: [true, "Enter Your Photo Url"] },
    password: { type: String, required: [true, "Enter Your Password"] },
    email: {
        type: String,
        required: [true, "Enter Your Email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    mobile: {
        type: String,
        required: [true, "Enter Your Mobile Number"],
        unique: true,
        validate: {
            validator: (v) => /^\d{10}$/.test(v),
            message: props => `${props.value} is not a valid 10-digit mobile number!`
        }
    },
wishlist: [
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    variantId: { type: mongoose.Schema.Types.ObjectId, ref: "products", default: null },
  }
],



    role: {
        type: String,
        enum: ['CUSTOMER', 'ADMIN'],
        default: "CUSTOMER"
    },
    isVerified: { type: Boolean, default: false }, // for email/mobile verification
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    paymentInformation: [{ type: mongoose.Schema.Types.ObjectId, ref: "PaymentInformation" }],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "ratings" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('users', userSchema);
module.exports = User;
