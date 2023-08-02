const express = require('express');
const { registerUser, loginUser, getUser, updatePassword, logoutUser } = require('../controllers/userController');
const { isUserAuthorized } = require('../middlewares/isUserAuthorized');
const userRouter = express.Router()


userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/user').get( isUserAuthorized ,getUser)
userRouter.route('/update').put(isUserAuthorized, updatePassword)
userRouter.route('/logout').get(logoutUser)


module.exports = {userRouter}