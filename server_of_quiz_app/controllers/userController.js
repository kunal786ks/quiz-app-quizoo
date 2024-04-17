const errorHandler = require("../lib/utils");
const userService = require("../service/userService");

const userRegisterController = async (req, res) => {
  try {
    const response = await userService.registerUser(req.body);
    return res.status(201).json({
      message: "Success",
      user: response.newUser,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const userLoginController = async (req, res) => {
  try {
    const response = await userService.loginUser(req.body);
    return res.status(201).json({
      message: "Success",
      user: response.userData,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const UdapteProfilePic = async (req, res) => {
  try {
    const response = await userService.UdapteProfilePicUser(req);
    return res.status(201).json({
      message: "SuccessFully updated",
      user: response.userFound,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteUserController = async (req, res) => {
  try {
    const response = await userService.deleteUser(req);
    return res.status(200).json({
      message: "User deleted Successfulyy",
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateUserController = async (req, res) => {
  try {
    const response = await userService.updateUser(req);
    return res.status(201).json({
      message: "Successfully updated",
      user: response?.userFound,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const passChangeRequestController=async(req,res)=>{
  try {
    const response=await userService.passChangeRequest(req);
    return res.status(200).json({
      message:"An otp is been sent to user with provided email"
    })
  } catch (error) {
    errorHandler(res,error)
  }
}
const updatePassController = async (req, res) => {
  try {
    const response=await userService.updatePassword(req);
    return res.status(201).json({
      message:"Password updated successfully"
    })
  } catch (error) {
    errorHandler(res, error);
  }
};


const getUserByAdminController=async(req,res)=>{
  try {
    const response=await userService.getAllUsersByadmin(req);
    return res.status(200).json({
      message:'Success',
      users:response.result
    })    
  } catch (error) {
    errorHandler(res,error)
  }
}
module.exports = {
  userRegisterController,
  userLoginController,
  UdapteProfilePic,
  deleteUserController,
  updateUserController,
  updatePassController,
  passChangeRequestController,
  getUserByAdminController
};
