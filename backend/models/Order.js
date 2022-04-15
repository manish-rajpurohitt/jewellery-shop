const mongoose = require("mongoose");
const Address = require("./Address");
const PaymentDetail = require("./PaymentDetail");
const Product = require("./Product");

// States : 
/*
Success order - prepaid: 
ORDER_RECEIVED, PAYMENT_INITIATED => PAYMENT_PROCESSING => PAYMENT_SUCCESS => ORDER_CONFIRMED, DELIVERY_INITIATED => DELIVERY_PICKED_UP,ORDER_PROCESSING => DELIVERY_PROCESSING => DELIVERY_SUCCESS, ORDER_DELIVERED

Success order - cod: 
ORDER_RECEIVED, PAYMENT_INITIATED => ORDER_CONFIRMED, DELIVERY_INITIATED => DELIVERY_PICKED_UP, ORDER_PROCESSING => DELIVERY_PROCESSING, PAYMENT_PROCESSING => DELIVERY_SUCCESS, ORDER_DELIVERED, PAYMENT_SUCCESS

Success Order but payment Failed :
ORDER_RECEIVED, PAYMMENT_INITIATED => PAYMENT_PROCESSING => PAYMENT_FAILED, ORDER_REJECTED

Success Order payment success but delivery failed :
ORDER_RECEIVED, PAYMENT_INITIATED => PAYMENT_PROCESSING => PAYMENT_SUCCESS => ORDER_CONFIRMED, DELIVERY_INITIATED => DELIVERY_PICKED_UP,ORDER_PROCESSING => DELIVERY_REJECTED, ORDER_REJECTED

Success order but client refuse or if user returns product - prepaid product :
ORDER_RECEIVED, PAYMENT_INITIATED => PAYMENT_PROCESSING => PAYMENT_SUCCESS => ORDER_CONFIRMED, DELIVERY_INITIATED => DELIVERY_PICKED_UP,ORDER_PROCESSING => DELIVERY_PROCESSING 
        => DELIVERY_SUCCESS, ORDER_DELIVERED => DELIVERY_RETURN_INITIATED, ORDER_RETURN_INITIATED, REFUND_INITIATED => DELIVERY_RETURN_PROCESSING, REFUND_PROCESSING, ORDER_RETURN_PROCESSING
        => if(return success): DELIVERY_RETURN_SUCCESS, ORDER_RETURN_SUCCESS, REFUND_SUCCESSFUL else:  REFUND_FAILED, DELIVERY_RETURN_FAILED, ORDER_RETURN_FAILED (need user help in this case to locate order and solve issue )

Success order but client refuse or if user returns product - cod product adding upi must me mandatory
ORDER_RECEIVED, PAYMENT_INITIATED => PAYMENT_PROCESSING => PAYMENT_SUCCESS => ORDER_CONFIRMED, DELIVERY_INITIATED => DELIVERY_PICKED_UP,ORDER_PROCESSING => DELIVERY_PROCESSING 
        => DELIVERY_SUCCESS, ORDER_DELIVERED => DELIVERY_RETURN_INITIATED, ORDER_RETURN_INITIATED, REFUND_INITIATED => DELIVERY_RETURN_PROCESSING, REFUND_PROCESSING, ORDER_RETURN_PROCESSING
        => if(return success and upi added): DELIVERY_RETURN_SUCCESS, ORDER_RETURN_SUCCESS, REFUND_SUCCESSFUL else(add upi ) :  REFUND_FAILED, DELIVERY_RETURN_FAILED, ORDER_RETURN_FAILED (need user help in this case to locate order and solve issue )
*/

const paymentStatusChangeHistory = mongoose.Schema({
    paymentState: {
        type: String,
        enum: ["PAYMENT_INITIATED", "PAYMENT_FAILED", "PAYMENT_PROCESSING", "PAYMENT_SUCCESS", "REFUND_INITIATED", "REFUND_PROCESSING", "REFUND_SUCCESSFUL", "REFUND_FAILED"],
        required: true
    },
    stateChangeTime: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const orderStatusChangeHistory = mongoose.Schema({
    orderState: {
        type: String,
        enum: ["ORDER_RECEIVED", "ORDER_CONFIRMED", "ORDER_REJECTED", "ORDER_PROCESSING", "ORDER_RETURN_INITIATED", "ORDER_RETURN_PROCESSING","ORDER_RETURNED", "ORDER_DELIVERED"],
        required: true
    },
    stateChangeTime: {
        type: Date,
        default: Date.now,
        required: true
    }
})


const OrderSchema = mongoose.Schema({
    addedOn:{
        type: Date
    },
    additionalInformation:{
        type: String
    },
    address:[Address],
    customerDetails : {
        type: Object,
        required: true
    },
    customerAgreementDetails:{
        type: String,
        required: true
    },
    cancellationReason: {
        type: String
    },
    paymentMode:{
        type:String,
        enum: ["COD", "PREPAID"]
    },
    deliveryStatus: {
        type: String,
        enum : ["DELIVERY_INITIATED", "DELIVERY_PICKED_UP", "DELIVERY_PROCESSING", "DELIVERY_REJECTED", "DELIVERY_SUCCESS", "DELIVERY_RETURN_INITIATED", 'DELIVERY_RETURN_SUCCESS', "DELIVERY_RETURN_FAILED", "DELIVERY_RETURN_PROCESSING"],
    },
    orderStatus: {
        type: String,
        enum : ["ORDER_RECEIVED", "ORDER_CONFIRMED", "ORDER_REJECTED", "ORDER_PROCESSING", "ORDER_RETURN_INITIATED", "ORDER_RETURN_PROCESSING","ORDER_RETURN_SUCCESS", "ORDER_DELIVERED", "ORDER_RETURN_FAILED"],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["PAYMENT_INITIATED", "PAYMENT_FAILED", "PAYMENT_PROCESSING", "PAYMENT_SUCCESS", "REFUND_INITIATED", "REFUND_PROCESSING", "REFUND_SUCCESSFUL", "REFUND_FAILED"],
        required: true
    },
    orderNetTotal:{
        type: String,
        required: true
    },
    orderDiscountInPercentage:{
        type: String
    },
    orderTaxBreakdown:{
        type: String
    },
    paymentDetails: {
        type: PaymentDetail,
    },
    paymentStatusChangeHistory: [paymentStatusChangeHistory],
    orderStatusChangeHistory: [orderStatusChangeHistory],
    products: Array,
    updatedOn: {
        type: Date,
        default: Date.now,
        required: true
    }
});





const Order = mongoose.model("orders", OrderSchema);

module.exports = Order;