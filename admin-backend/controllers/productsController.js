
const Product = require('../models/Product');
const User = require('../models/User');

exports.addProduct = async (req, res, next) =>{
    try{
        const id = req.user.email;
        const user = await User.findOne({id});
        const productBody = req.body;
        if(!user)
            return next(new ErrorResponse("Invalid user credentials", 400));
        
        let product = await Product.create({
            description : productBody.description,
            isAvailableOnWebsite : productBody.isAvailableOnWebsite,
            isDeliveryAvailable : productBody.isDeliveryAvailable,
            purchasePrice : productBody.purchasePrice,
            sellingPrice : productBody.sellingPrice,
            stockQuantity : productBody.stockQuantity,
            stockQuantityUnit : productBody.stockQuantityUnit,
            isWarrantyAvailable : productBody.isWarrantyAvailable,
            productName : productBody.productName,
            title : productBody.title
        });
        res.status(201).json({
            success: true,
            data: product._id
        });
    }catch(e){
        next(e)
    }
}
