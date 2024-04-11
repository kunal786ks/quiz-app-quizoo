const questionModel = require("../model/questionModel");
const TestModel = require("../model/testModel");
const reportModel = require("../model/userReportModel");

const createQuestions = async (req) => {
  try {
    const user = req.user;
    if (user.role !== 1) {
      throw Object.assign(new Error(), {
        name: "UNAUTHORIZED",
        message: "You arenot allowed for this action",
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
    const testFound=await TestModel.findOne({_id:testId})
    if(!testFound){
        throw Object.assign(new Error(),{name:"NOT_FOUND",message:"Test is not present"})
    }
    if(testFound.totalQuestions<=0){
        throw Object.assign(new Error(),{name:"UNAUTHORIZED",message:"This Test has reached the max questions limit"})
    }
    if(marksOfQuestions>testFound.MaximumMarks || marksOfQuestions>testFound.remaingMarksQuestionsTobeAdded || testFound.remaingMarksQuestionsTobeAdded===0){
        throw Object.assign(new Error(),{name:"UNAUTHORIZED",message:"This question exceed the limit of the questions' marks"})
    }
    
    const question = await questionModel.create({
      question_title,
      questionChoices,
      correctAnswer,
      testId,
      marksOfQuestions,
    });
    testFound.totalQuestions-=1;
    testFound.remaingMarksQuestionsTobeAdded-=marksOfQuestions;
    await testFound.save();
    return { question };
  } catch (error) {
    throw error;
  }
};

const answerQuestion = async (req) => {
  try {
    const { testId, questionAndAnsByuser }=req.body
    if (!testId || !questionAndAnsByuser) {
      throw Object.assign(new Error(), {
        name: "BAD_REQUEST",
        message: "All Field are not present",
      });
    }
    const questions = await questionModel.find({ testId });
    if(!questions){
        throw Object.assign(new Error(),{name:"NOT_FOUND",message:"Cannot find questions of this test"})
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
    const testFound=await TestModel.findOne({_id:testId})
    let passStatus=false;
    if(scoreEarned>=testFound.passingMarks){
        passStatus=true;
    }
    const userReport=await reportModel.create({
        userId:req.user._id,
        testId,
        totalQuestions: questions.length,
        maximumMarks: totalScore,
        correctQuestions: totalCorrectQuestions,
        score: scoreEarned,
        notAttempted: questions.length - questionAndAnsByuser.length,
        wrongAns: incorrectAns,
        passStatus,
        userExam:questionAndAnsByuser
    });
    return { userData };
  } catch (error) {
    throw error;
  }
};


const questionService = {
  createQuestions,
  answerQuestion,
};

module.exports = questionService;
