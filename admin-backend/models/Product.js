const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    addedOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    brandName: {
        type: String
    },
    title:{
        type: String,
        required : true
    },
    categoryCode: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    gstInPercentage: {
        type: String
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
        type: String
    },
    modelName: {
        type: String
    },
    productCategoryId: {
        type: String
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
        type: Array
    },
    variantValues: {
        type: Array
    },
    isWarrantyAvailable: {
        type: Boolean,
        required: true
    },
    warranty: {
        type: Number
    },
    warrantyUnit: {
        type: String,
        enum: ["YEAR", "MONTH"],
    }  
});

let Product = mongoose.model("Products", ProductSchema);
module.exports = Product;