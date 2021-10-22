const mongoose = require('mongoose');

const Product = mongoose.Schema({
    addedOn: {
        type: Date,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    categoryCode: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    gstInPercentage: {
        type: String,
        required: true
    },
    isAvailableOnWebsite: {
        type: Boolean,
        required: true
    },
    isDeliveryAvailable: {
        type: Boolean,
        required: true
    },
    manufacturingCountry: {
        type: String,
        required: true
    },
    modelName: {
        type: String,
        required: true
    },
    productCategoryId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    purchasePrice: {
        type: String,
        required: true
    },
    sellingPrice: {
        type: String,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    stockQuantityUnit: {
        type: String,
        enum: ["PIECE", "DOZEN", "LOT", "KILO_GRAM", "GRAM", "METER", "CENTI_METER"],
        required: true
    },
    updatedOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    variantAttributes: {
        type: Array,
        required: true
    },
    variantValues: {
        type: Array,
        required: true
    },
    isWarrantyAvailable: {
        type: Boolean,
        required: true
    },
    warranty: {
        type: Number,
        required = true
    },
    warrantyUnit: {
        type: String,
        enum: ["YEAR", "MONTH"],
        required: true
    }  
});


module.exports = Product;