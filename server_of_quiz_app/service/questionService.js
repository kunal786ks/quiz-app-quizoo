const questionModel = require("../model/questionModel");
const TestModel = require("../model/testModel");
const reportModel = require("../model/userReportModel");

const createQuestions = async (req) => {
  try {
    const userLoggedIn = req.user;
    if (userLoggedIn.role !== 2 && userLoggedIn.role !== 1) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "You are not allowed for this action",
      });
    }

    const {
      question_title,
      questionChoices,
      correctAnswer,
      testId,
      marksOfQuestions,
    } = req.body;
    if (
      !questionChoices ||
      !question_title ||
      !testId ||
      !correctAnswer ||
      !marksOfQuestions
    ) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "All Mandatory field are not present",
      });
    }
    const testFound = await TestModel.findOne({ _id: testId });
    if (!testFound) {
      throw Object.assign(new Error(), {
        name: "NOT_FOUND",
        message: "Test is not present",
      });
    }
    if (
      userLoggedIn._id.toString() !== testFound.owner.toString() &&
      userLoggedIn.role !== 2
    ) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "You are not owner of this test",
      });
    }
    if (
      marksOfQuestions > testFound.MaximumMarks ||
      marksOfQuestions > testFound.remaingMarksQuestionsTobeAdded ||
      testFound.remaingMarksQuestionsTobeAdded === 0
    ) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "This question exceed the limit of the questions' marks",
      });
    }

    const question = await questionModel.create({
      question_title,
      questionChoices,
      correctAnswer,
      testId,
      marksOfQuestions,
    });
    testFound.remaingMarksQuestionsTobeAdded -= marksOfQuestions;
    await testFound.save();
    return { question };
  } catch (error) {
    throw error;
  }
};

const answerQuestion = async (req) => {
  try {
    const { testId, questionAndAnsByuser } = req.body;
    if (!testId || !questionAndAnsByuser) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "All Field are not present",
      });
    }
    const questions = await questionModel.find({ testId });
    if (!questions) {
      throw Object.assign(new Error(), {
        name: "NOT_FOUND",
        message: "Cannot find questions of this test",
      });
    }
    let totalScore = 0;
    const correctAnswersMap = questions.reduce((acc, question) => {
      totalScore += question.marksOfQuestions;
      acc[question._id.toString()] = acc[question._id.toString()] = {
        correctAnswer: question.correctAnswer,
        marksOfQuestions: question.marksOfQuestions,
      };
      return acc;
    }, {});
    let totalCorrectQuestions = 0;
    let scoreEarned = 0;
    let incorrectAns = 0;
    questionAndAnsByuser.forEach((userAns) => {
      const correctAnswer = correctAnswersMap[userAns.quesId];
      if (
        correctAnswer.correctAnswer &&
        correctAnswer.correctAnswer === userAns.ansMarked
      ) {
        totalCorrectQuestions += 1;
        scoreEarned += correctAnswer.marksOfQuestions;
      } else {
        incorrectAns++;
      }
    });
    const userData = {
      totalQuestion: questions.length,
      maximumMarks: totalScore,
      correctQuestion: totalCorrectQuestions,
      score: scoreEarned,
      notAttempted: questions.length - questionAndAnsByuser.length,
      wrongAns: incorrectAns,
    };
    const testFound = await TestModel.findOne({ _id: testId });
    let passStatus = false;
    if (scoreEarned >= testFound.passingMarks) {
      passStatus = true;
    }
    const userReport = await reportModel.create({
      userId: req.user._id,
      testId,
      totalQuestions: questions.length,
      maximumMarks: totalScore,
      correctQuestions: totalCorrectQuestions,
      score: scoreEarned,
      notAttempted: questions.length - questionAndAnsByuser.length,
      wrongAns: incorrectAns,
      passStatus,
      userExam: questionAndAnsByuser,
    });
    return { userData };
  } catch (error) {
    throw error;
  }
};

const getQuestionOfTest = async (req) => {
  try {
    const { testId } = req.body;
    const user = req.user;
    if (!testId) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "Bad action",
      });
    }
    if (user.role === 0) {
      const questions = await questionModel.find(
        { testId: testId },
        { correctAnswer: 0 }
      );
      const question = {
        totalQuestion: questions.length,
        questions: questions,
      };

      return { question };
    } else {
      const questions = await questionModel.find({ testId: testId });
      const question = {
        totalQuestion: questions.length,
        questions: questions,
      };

      return { question };
    }
  } catch (error) {
    throw error;
  }
};

const editQuestion = async (req) => {
  try {
    const user = req.user;
    if (user.role !== 2 && user.role !== 1) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "You are not allowed for this action",
      });
    }
    const {
      question_title,
      questionChoices,
      correctAnswer,
      testId,
      marksOfQuestions,
      questionId,
    } = req.body;
    if (
      !question_title ||
      !questionChoices ||
      !correctAnswer ||
      !testId ||
      !marksOfQuestions ||
      !questionId
    ) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "Required Field are not present",
      });
    }
    if (user.role === 1) {
      const testFound = await TestModel.findById(testId);
      if (testFound.owner.toString() !== req.user._id.toString()) {
        throw Object.assign(new Error(), {
          name: "UNAUTHORIZED",
          message: "You are not owner of test",
        });
      }
      await questionModel.findByIdAndUpdate(questionId, {
        question_title,
        questionChoices,
        correctAnswer,
        testId,
        marksOfQuestions,
      });

      return;
    } else if (user.role === 2) {
      await questionModel.findByIdAndUpdate(questionId, {
        question_title,
        questionChoices,
        correctAnswer,
        testId,
        marksOfQuestions,
      });
    }
  } catch (error) {
    throw error;
  }
};

const deleteQuestion = async (req) => {
  try {
    const user = req.user;
    if (user.role !== 2 && user.role !== 1) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "You are not allowed for this action",
      });
    }
    const { testId, questionId } = req.body;
    if (!testId || !questionId) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "Required Field are not present",
      });
    }
    const questionFound = await questionModel.findByIdAndDelete(questionId);
    if (!questionFound) {
      throw Object.assign(new Error(), {
        name: "NOT_FOUND",
        message: "This Question is not present",
      });
    }
    const testFound = await TestModel.findById(testId);
    if (!testFound) {
      throw Object.assign(new Error(), {
        name: "NOT_FOUND",
        message: "This Question is not present",
      });
    }
    if (testFound.owner.toString() !== req.user._id.toString()) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "You are not owner of test",
      });
    }
    testFound.remaingMarksQuestionsTobeAdded += questionFound.marksOfQuestions;
    await testFound.save();
    return;
  } catch (error) {
    throw error;
  }
};

const questionService = {
  createQuestions,
  answerQuestion,
  getQuestionOfTest,
  editQuestion,
  deleteQuestion
};

module.exports = questionService;
