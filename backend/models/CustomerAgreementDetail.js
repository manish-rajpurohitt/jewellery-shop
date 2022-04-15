const mongoose = require("mongoose");

const CustomerAgreementDetailsSchema = mongoose.Schema({
    dateAndTimeOfAgreement:{
        type: Date,
        default: Date.now
    },
    hasAgreed:{
        type: Boolean,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    privacyPolicyVersion:{
        type: String,
        required: true
    },
    returnAndRefundCancellationVersion:{
        type: String,
        required: true
    },
    termsOfSaleVersion:{
        type: String,
        required: true
    },
    termsOfUseVersion:{
        type: String,
        required: true
    }
});

const CustomerAgreementDetails = mongoose.model("customerAgreementDetails",CustomerAgreementDetailsSchema);
module.exports = CustomerAgreementDetails;
