const mongoose = require("mongoose");

const PaymentDetail = mongoose.Schema({
    paymentRetryCount:{
        type: Number,
        default: 3,
        required: true
    },
    paymentId:{
        type: String,
        required : true
    },
    invoiceId:{
        type: String,
        required : true
    },
    paymentMethod:{
        type: String,
        enum: ["COD", "UPI", "CARD", "INERNET_BANKING"],
        required : true
    },
    paymentProvider:{
        type: String,
        enum: ["STRIPE", "PAY_U"],
        required : true
    },
    transactionAmount:{
        type: String,
        required : true
    },
    transactionReferenceNumber:{
        type: String,
        required : true
    },
    transactionTimeStamp:{
        type: Date,
        required : Date.now
    }
})

module.exports = PaymentDetail;