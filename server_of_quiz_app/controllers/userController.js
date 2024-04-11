const errorHandler = require("../lib/utils");
const userService = require("../service/userService");

const userRegisterController = async (req, res) => {
  try {
    const response=await userService.registerUser(req.body);
    return res.status(201).json({
        message:"Success",
        user:response.newUser
    })
  } catch (error) {
    errorHandler(res, error);
  }
};

const userLoginController = async (req, res) => {
  try {
    const response=await userService.loginUser(req.body);
    return res.status(201).json({
        message:"Success",
        user:response.userData
    })
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = { userRegisterController, userLoginController };
