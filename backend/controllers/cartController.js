const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');

exports.createCartSession = async (req, res, next) =>{
    try{
        
        let cart = await Cart.create({
            items : [],
            subTotal : 0
        });

        res.status(201).json({
            success: true,
            sessionId: cart._id
        });
    }catch(e){
        next(e)
    }
}

exports.addProduct = async (req, res, next) =>{
    try{
        const sessionId = req.body.sessionId;
        const cart = await Cart.findOne({_id : sessionId});
        const product = await Product.findOne({_id : req.body.productId});
        let item = {
            product : product,
            quantity: req.body.quantity,
            subTotal: parseFloat(req.body.quantity) * parseFloat(product.sellingPrice)
        }
        for(let i=0; i< cart.items.length; i++){
            if(cart.items[i].product._id.toString() === product._id.toString()){
                cart.items[i].quantity = parseInt(cart.items[i].quantity) + parseInt(req.body.quantity);
                console.log(cart);
                cart.subTotal = parseFloat(cart.subTotal) - parseFloat(cart.items[i].subTotal);
                cart.items[i].subTotal = parseFloat(cart.items[i].quantity) * parseFloat(product.sellingPrice);
                cart.subTotal = parseFloat(cart.subTotal) + parseFloat(cart.items[i].subTotal);
                cart.save();
                res.status(201).json({
                    success:true,
                    data: cart.subTotal
                });
                return;
            }
        }
        cart.items.push(item);
        cart.subTotal = parseFloat(cart.subTotal) + (parseFloat(req.body.quantity) * parseFloat(product.sellingPrice));
        cart.save();
        res.status(201).json({
            success:true,
            data: cart.subTotal
        });
    }catch(e){
        next(e)
    }
}

exports.getProducts = async (req, res, next) => {

    try{
        const sessionId = req.body.sessionId;
        const cart = await Cart.findOne({_id : sessionId});
        let products = [];
        cart.items.map(item=>{
            products.push(item);
        })
        res.status(201).json({
            success: true,
            data: products
        });
    }
    catch(e){
        next(e)
    }
}

exports.clearCart = async (req, res, next) => {
    try{
        const sessionId = req.body.sessionId;
        const cart = await Cart.findOne({_id : sessionId});
        cart.items = [];
        cart.subTotal = 0;
        cart.save()
        res.status(201).json({
            success: true,
            data: "success"
        });
    }
    catch(e){
        next(e)
    }
}
