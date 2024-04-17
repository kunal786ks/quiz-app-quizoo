const express=require('express');
const { userLoginController, userRegisterController,UdapteProfilePic,updatePassController, deleteUserController, updateUserController, passChangeRequestController, getUserByAdminController } = require('../controllers/userController');
const {upload}=require('../config/multerService');
const { protect } = require('../middleware/authMiddleware');

const router=express.Router();

router.get("/get-user-admin",protect,getUserByAdminController)

router.post('/signup',userRegisterController)
router.post('/login',userLoginController);
router.post('/uploadpic/:userId',protect,upload.single('pic'),UdapteProfilePic);
router.post('/update-password',updatePassController);
router.post('/passchange',passChangeRequestController);

router.delete('/delete-user/:userId',protect,deleteUserController);

router.put('/update-user/:userId',protect,updateUserController);


module.exports=router;