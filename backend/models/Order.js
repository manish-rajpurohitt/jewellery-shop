const mongoose = require("mongoose");
const Address = require("./Address");
const CustomerAgreementDetails = require("./CustomerAgreementDetails");
const PaymentDetail = require("./PaymentDetail");


const Order = mongoose.Schema({
    addedOn:{
        type: Date
    },
    additionalInformation:{
        type: String
    },
    address:[Address],
    customerAgreementDetails:{
        type: CustomerAgreementDetails,
        required: true
    },
    cancellationReason: {
        type: String,
        required: true
    },
    deliveryDetailsId: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum : ["ORDER_RECEIVED", "ORDER_CONFIRMED", "ORDER_PROCESSING", "ORDER_RETURNED", "ORDER_DELIVERED"]
    },
    orderNetTotal:{
        type: String,
        required: true
    },
    orderDiscountInPercentage:{
        required: true,
        type: String
    },
    orderTaxBreakdown:{
        required: true,
        type: String
    },
    paymentDetails: {
        type: PaymentDetail,
        required : true
    },
    paymentStatus: {
        type: String,
        enum: ["PAYMENT_INITIATED", "PAYMENT_FAILED", "PAYMENT_PROCESSING", "PAYMENT_SUCCESS"]
    },
    paymentStatusChangeHistory: [paymentStatusChangeHistory],
    products: [Product],
    updatedOn: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const paymentStatusChangeHistory = mongoose.Schema({
    paymentState: {
        type: String,
        enum: ["PAYMENT_INITIATED", "PAYMENT_FAILED", "PAYMENT_PROCESSING", "PAYMENT_SUCCESS"],
        required: true
    },
    stateChangeTime: {
        type: Date,
        default: Date.now,
        required: true
    }
})


module.exports = Order;