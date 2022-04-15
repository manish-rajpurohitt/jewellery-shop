const mongoose = require("mongoose");
const Product = require('../models/Product');

const ItemSchema = new mongoose.Schema({
    product: {
        type: Object
    },
    quantity: {
        type: String
    },
    subTotal:{
        type: String
    }
});


const CartSchema = new mongoose.Schema({
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    },
    userId: {
        type: String
    }
});



const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;