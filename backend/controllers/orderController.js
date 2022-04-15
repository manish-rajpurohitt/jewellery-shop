const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require("../models/Order");

exports.createOrder = async (req, res, next) =>{
    try{
        let sessionId = req.body.sessionId;
        let discount = req.body.discount;
        let paymentMode = req.body.paymentMode;
        let addressMode = req.body.addressMode;
        let user = req.user;
        let products = [];
        let orderTotal = 0;

        let cart = await Cart.findById({_id:sessionId});
        products = cart.items.filter(cartItem => {
            return cartItem.product;
        });
        orderTotal = cart.subTotal;
        let add = user.address.map(add=>{
            console.log('address +', add.addressType, addressMode)
          if(add.addressType === addressMode)
            return add;      
        });
        let order = {
            addedOn : Date.now(),
            address : add,
            customerAgreementDetails : "AGREED",
            customerDetails: req.user,
            paymentMode : paymentMode,
            orderStatus: "ORDER_RECEIVED",
            paymentStatus: "PAYMENT_INITIATED",
            orderNetTotal: orderTotal,
            orderDiscountInPercentage: discount,
            paymentStatusChangeHistory : [{
                paymentState: "PAYMENT_INITIATED",
                stateChangeTime: Date.now()
            }],
            orderStatusChangeHistory: [{
                orderState: "ORDER_RECEIVED",
                stateChangeTime: Date.now()
            }],
            products: products,
            updatedOn: Date.now()
        }

        let orderData = await Order.create(order);

        res.status(201).json({
            success: true,
            orderId: orderData._id
        });
    }catch(e){
        next(e)
    }
}