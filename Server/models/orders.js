
const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },

    products : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product",
            required : true,
        },
        quantity : {
            type : Number,
            required : true,
        }
    }],

    status : {
        type : String,
        enum : ["pending" , "shipped" , "delivered" , "cancelled" , "confirmed"],
        default : "pending",
    },

    phoneNb:{
        type : Number,
        required : true
    },
    
    willaya:{
        type : String,
        required : [true , "please enter your willaya"],
    },

    email : {
        type : String,
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please provide a valid email",
        ],
        unique : true
    },

    adress : {
        type : String,
        required : [true,"please provide your adress"]
    },

    additional_Info:{
        type : String,
    }

} , {timestamps : true});

module.exports = mongoose.model("Order" , orderSchema);