const express=require('express');
const { userLoginController, userRegisterController } = require('../controllers/userController');

const router=express.Router();

router.post('/signup',userRegisterController)
router.post('/login',userLoginController)

module.exports=router;