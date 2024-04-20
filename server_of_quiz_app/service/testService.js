const questionModel = require("../model/questionModel");
const TestModel = require("../model/testModel");
const userModel = require("../model/userModel");

const createTest = async (req) => {
  try {
    const user = req.user;
    if (user.role !== 1 && user.role!==2) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "You arenot allowed for this action",
      });
    }

    const {
      title,
      MaximumMarks,
      passingMarks,
      time_to_finish,
      instruction,
      testDescription,
      testCategory,
    } = req.body;

    if (MaximumMarks > 100) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "Test cannot be more than 100 marks",
      });
    }
    if (passingMarks > MaximumMarks) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "Passing marks cannot be greater than maximum marks",
      });
    }
    const alreadyExist = await TestModel.findOne({
      title,
      testCategory: testCategory,
      owner: req.user._id,
    });
    if (alreadyExist) {
      throw Object.assign(new Error(), {
        name: "CONFLICT",
        message: "Test already created by this user",
      });
    }

    if (
      !title ||
      !time_to_finish ||
      !instruction ||
      !MaximumMarks ||
      !testDescription ||
      !passingMarks ||
      !testCategory
    ) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "Manadatory fileds are not present",
      });
    }

    const test = await TestModel.create({
      title,
      owner: req.user._id,
      time_to_finish,
      instruction,
      passingMarks,
      MaximumMarks,
      testDescription,
      testCategory,
      remaingMarksQuestionsTobeAdded: MaximumMarks,
    });

    return { test };
  } catch (error) {
    throw error;
  }
};

const getAllTestWithPageAndLimit = async (req) => {
  try {
   
    const { page, limit, search, sortOrder, status } = req.query;
    let query = {};
  
    // Add search query
    if (search) {
      const regex = new RegExp(search, "i");
      query.title = { $regex: regex };
    }

    // Add status query
    if (status === "completed") {
      query.remaingMarksQuestionsTobeAdded = 0;
    } else if (status === "pending") {
      query.remaingMarksQuestionsTobeAdded = { $ne: 0 };
    }

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit);

    const sortDirection =
      sortOrder && sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const tests = await TestModel.find(query)
      .populate("owner", "name email pic")
      .sort({ createdAt: sortDirection })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const totalRecords = await TestModel.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / pageSize);

    const test = {
      totalRecords: totalRecords,
      totalPages: totalPages,
      page: page,
      limit: limit,
      records: tests,
    };
    return { test };
  } catch (error) {
    throw error;
  }
};

const getTestByID = async (req) => {
  try {
    const Id = req.params.testId;
    if (!Id) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "TestId is not present",
      });
    }
    const userId = req.user._id;
    const userLoggedIn = await userModel.findById(userId);
    if (userLoggedIn.role === 0) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "You are restricted for this action",
      });
    }

    const testFound = await TestModel.findById(Id);

    if ((userLoggedIn._id.toString() !== testFound.owner.toString()) && userLoggedIn.role!==2) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "You are not owner of this test",
      });
    }

    if (!testFound) {
      throw Object.assign(new Error(), {
        name: "NOT_FOUND",
        message: "Test not found",
      });
    }

    return { testFound };
  } catch (error) {
    throw error;
  }
};

const getUserTest = async (req) => {
  try {
    
    const id = req.user._id;
    const userRole=req.user.role;

    console.log(userRole);
    const { page, limit, search, sortOrder, status } = req.query;
    let query = { owner: id };

    if (search) {
      const regex = new RegExp(search, "i");
      query.title = { $regex: regex };
    }

    if (status === "completed") {
      query.remaingMarksQuestionsTobeAdded = 0;
    } else if (status === "pending") {
      query.remaingMarksQuestionsTobeAdded = { $ne: 0 };
    }

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit);

    const sortDirection =
      sortOrder && sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const tests = await TestModel.find(query)
      .populate("owner", "name email pic")
      .sort({ createdAt: sortDirection })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const totalRecords = await TestModel.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / pageSize);

    const test = {
      totalRecords: totalRecords,
      totalPages: totalPages,
      page: page,
      limit: limit,
      records: tests,
    };
    return { test };
  } catch (error) {
    throw error;
  }
};

const deleteTest=async(req)=>{
  try {
    const loggedInUser=req.user;
    const testId=req.params.testId;
    if(loggedInUser.role!==1 && loggedInUser.role!==2){
      throw Object.assign(new Error(),{name:"UNAUTHORIZED",message:"You are not allowed for this action"})
    }
    if(loggedInUser.role===1){
      const testFound=await TestModel.findOneAndDelete({_id:testId,owner:loggedInUser._id});
      if(!testFound){
        throw Object.assign(new Error(),{name:"NOT_FOUND",message:"Test Not Found or You are not owner of test"})
      }
    }else if(loggedInUser.role===2){
      const testFound=await TestModel.findByIdAndDelete(testId);
      if(!testFound){
        throw Object.assign(new Error(),{name:"NOT_FOUND",message:"Test not found to delete"})
      }
    }
   
    await questionModel.deleteMany({testId:testId})

    return {message:"Test and questions deleted successfully"}
  } catch (error) {
    throw error;
  }
}

const testService = {
  createTest,
  getAllTestWithPageAndLimit,
  getTestByID,
  getUserTest,
  deleteTest
};

module.exports = testService;
