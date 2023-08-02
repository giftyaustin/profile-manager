const { tryCatch } = require("../middlewares/tryCatch")
const { User } = require("../models/userModel")
const bcrypt = require('bcrypt')

// register user 
exports.registerUser=tryCatch(async (req, res, next)=>{
    
    const user = await User.findOne({email:req.body.email})
    if(user){
        res.status(409).json({
            success:false,
            message:'Email already exists'
        })
    }
    else{ 
        const newUser = await User.create(req.body)
        await newUser.save()
        newUser.sendJWT(req, res, next)
    }

})


// login user

exports.loginUser=tryCatch( async (req, res, next)=>{
   
    const user = await User.findOne({email:req.body.email}).select('+password');
    if(!user){
        return next(new CustomError('Invalid email or password'), 401)
    }
    const isPasswordMatched = await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordMatched){
        return next(new CustomError('Invalid email or password', 401))
    }
    user.sendJWT(req, res, next)
})



// get user details 
exports.getUser = tryCatch(async(req, res, next)=>{
    return res.status(200).json({
        success:true,
        user:req.user
    })
})


exports.updatePassword=tryCatch(async(req, res, next)=>{
    const user = await User.findById(req.user.id.toString()).select("+password")

console.log(user)

    if(user){
        const isPasswordMatched = await bcrypt.compare(req.body.currPassword, user.password)
        if(isPasswordMatched){
            user.password = req.body.newP
            await user.save()
            return res.status(200).json({
                message:'Updated password'
            })
        }
        else{
            return res.status(409).json({
                message:'incorrect old password'
            })
        }
    }else{
        return res.json({
            message:'login'
        })
    }
})




// logout user

// logout User
exports.logoutUser=tryCatch(async(req, res, next)=>{
  
    res.cookie('token', {}, {httpOnly:true, expires:new Date(Date.now())})
    res.json({
        message:'logged out Successfully'
    })
})