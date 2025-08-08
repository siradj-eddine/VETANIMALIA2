const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "please provide a name for the product"]
    },

    category : {
        type : String,
        required : [true , "please provide a category for the product"],
    },

    price : {
        type : Number,
        required : [true , "please provide a price for the product"],
    },

    description : {
        type : String,
    },

    available : {
        type : Boolean,
        required : true
    },

    image: [{
        url: String,
        publicId: String
    }],

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
})

module.exports = mongoose.model("Product" , productSchema);