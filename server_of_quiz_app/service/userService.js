const { generateToken } = require("../config/tokenServuce");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const { replaceSpacesWithPercent20 } = require("../lib/imageService");
const { sendMail } = require("../config/mailService");
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
    const user = await userModel.findOne({ email });
    if (!user) {
      throw Object.assign(new Error(), {
        name: "CONFLICT",
        message: "User with this email doesn't exist",
      });
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "Password incorrect",
      });
    }
    const token = generateToken(user);
    const userData = {
      token,
      user,
    };
    return { userData };
  } catch (error) {
    throw error;
  }
};

const UdapteProfilePicUser = async (req) => {
  try {
    const id = req.params.userId;
    if (!id) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "userId is required",
      });
    }
    const userFound = await userModel.findById(id);
    if (!userFound) {
      throw Object.assign(new Error(), {
        name: "NOT_FOUND",
        message: "User with id not found",
      });
    }
    let image_url;
    if (req.file?.filename) {
      image_url = replaceSpacesWithPercent20(`/images/${req.file?.filename}`);
    }
    userFound.pic = image_url;
    await userFound.save();
    return { userFound };
  } catch (error) {
    throw error;
  }
};
const deleteUser = async (req) => {
  try {
    const id = req.params.userId;
    if (!id) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "userId is required",
      });
    }
    const userFound = await userModel.findByIdAndDelete(id);
    if (!userFound) {
      throw Object.assign(new Error(), {
        name: "NOT_FOUND",
        message: "User with id not found",
      });
    }
    return;
  } catch (error) {
    throw error;
  }
};

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

const updateUser = async (req) => {
  try {
    const id = req.params.userId;
    if (!id) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "userId is required",
      });
    }
    if (isEmptyObject(req.body)) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "One field is required to update",
      });
    }
    const userFound = await userModel.findById(id);
    if (req.body.email) {
      userFound.email = req.body.email;
    }
    if (req.body.name) {
      userFound.name = req.body.name;
    }
    await userFound.save();
    return { userFound };
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (req) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "Requried Fields are not present",
      });
    }
    const userFound = await userModel.findOne({ email });
    if (!userFound) {
      throw Object.assign(new Error(), {
        name: "NOT_FOUND",
        message: "User with this email doesn't exists",
      });
    }
    if (userFound.otp === otp) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      userFound.password = hashedPassword;
      await userFound.save();
      return;
    } else {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "Otp doesn't match",
      });
    }
  } catch (error) {
    throw error;
  }
};

const passChangeRequest = async (req) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "Email is not present",
      });
    }
    const userFound = await userModel.findOne({ email });
    if (!userFound) {
      throw Object.assign(new Error(), {
        name: "NOT_FOUND",
        message: "User with this email doesn't exists",
      });
    }
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const otp = randomNumber.toString();
    userFound.otp=otp;
    await userFound.save();
    sendMail(email, otp);
    return ;
  } catch (error) {
    throw error;
  }
};

const getAllUsersByadmin = async (req) => {
  try {
    const { page, limit, search } = req.query;
    const loggedInUserId = req.user._id;
    let query = {};

    const currentUser = await userModel.findById(loggedInUserId);
    if (currentUser.role !== 1) {
      throw Object.assign(new Error(), { name: "UNAUTHORIZED", message: "Only Admin can access this" });
    }

    if (loggedInUserId) {
      query._id = { $ne: loggedInUserId };
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      query.email = { $regex: regex };
    }

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit);

    const users = await userModel.find(query, 'name email role') 
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const totalRecords = await userModel.countDocuments(query);

    const totalPages = Math.ceil(totalRecords / pageSize);

    const result = {
      totalRecords: totalRecords,
      totalPages: totalPages,
      page: page,
      limit: limit,
      records: users,
    };

    return { result };
  } catch (error) {
    throw error;
  }
}



const userService = {
  loginUser,
  registerUser,
  UdapteProfilePicUser,
  deleteUser,
  updateUser,
  passChangeRequest,
  updatePassword,
  getAllUsersByadmin
};

module.exports = userService;
