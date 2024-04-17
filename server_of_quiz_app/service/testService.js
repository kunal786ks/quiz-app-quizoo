const TestModel = require("../model/testModel");

const createTest = async (req) => {
  try {
    const user = req.user;
    if (user.role !== 1) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "You arenot allowed for this action",
      });
    }

    const {
      title,
      totalQuestions,
      MaximumMarks,
      passingMarks,
      time_to_finish,
      instruction,
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
      !totalQuestions ||
      !MaximumMarks ||
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
      totalQuestions,
      passingMarks,
      MaximumMarks,
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
    const { page, limit } = req.query;
    if (!page || !limit) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "limit or page is not present",
      });
    }
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit);

    const tests = await TestModel.find()
      .populate( "owner","name email pic" )
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    const allTests = await TestModel.find();
    const test = {
      totalRecords: allTests.length,
      page: page,
      limit: limit,
      records: tests,
    };
    return { test };
  } catch (error) {
    throw error;
  }
};

const testService = {
  createTest,
  getAllTestWithPageAndLimit,
};

module.exports = testService;
