
const User = require('../models/User');

exports.addNewAddress = async (req, res, next) =>{
    try{
        const id = req.user.email;
        const user = await User.findOne({id});
        const address = req.body;
        if(!user)
            return next(new ErrorResponse("Invalid user credentials", 400));
        user.address.push(address);
        await user.save();
        res.status(201).json({
            success: true,
            data: "User address saved"
        });
    }catch(e){
        next(e)
    }
}

exports.getAllAddress = async (req, res, next) =>{
    try{
        const email = req.user.email;
        const user = await User.findOne({email});
        if(!user)
            return next(new ErrorResponse("Invalid user credentials", 400));
    
        res.status(201).json({
            success: true,
            data: user.address
        });
    }catch(e){
        next(e)
    }
}