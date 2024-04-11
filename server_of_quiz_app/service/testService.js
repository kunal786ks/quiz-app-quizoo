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
      owner: req.user._id,
    });
    if (alreadyExist) {
      throw Object.assign(new Error(), {
        name: "CONFLICT",
        message: "Test already created",
      });
    }

    if (
      !title ||
      !time_to_finish ||
      !instruction ||
      !totalQuestions ||
      !MaximumMarks ||
      !passingMarks
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
      remaingMarksQuestionsTobeAdded:MaximumMarks
    });

    return { test };
  } catch (error) {
    throw error;
  }
};

const testService = {
  createTest,
};

module.exports = testService;
