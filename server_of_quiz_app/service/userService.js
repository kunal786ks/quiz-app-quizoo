const { generateToken } = require("../config/tokenServuce");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const registerUser = async ({ name, email, password }) => {
  try {
    if (!name || !email || !password) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "All required feilds are not present",
      });
    }
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      throw Object.assign(new Error(), {
        name: "CONFLICT",
        message: "User with this email already present",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user);
    const newUser = {
      token,
      user,
    };
    return { newUser };
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  try {
    if (!email || !password) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "All required feilds are not present",
      });
    }
    const user=await userModel.findOne({email});
    if(!user){
        throw Object.assign(new Error(),{name:"CONFLICT",message:"User with this email doesn't exist"})
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if(!isMatchPassword){
        throw Object.assign(new Error(),{name:"UNAUTHORIZED",message:"Password incorrect"})
    }
    const token=generateToken(user);
    const userData={
        token,
        user
    }
    return {userData}
  } catch (error) {
    throw error;
  }
};


const userService={
    loginUser,
    registerUser
}

module.exports=userService