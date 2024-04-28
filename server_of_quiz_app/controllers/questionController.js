const errorHandler = require("../lib/utils");
const questionService = require("../service/questionService");

const createQuesController = async (req, res) => {
  try {
    const response = await questionService.createQuestions(req);
    return res.status(201).json({
      success: "True",
      question: response.question,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const giveAnsController = async (req, res) => {
  try {
    const response = await questionService.answerQuestion(req);
    return res.status(200).json({
      message: "Success",
      userAnalytics: response.userData,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getQuestionController = async (req, res) => {
  try {
    const response = await questionService.getQuestionOfTest(req);
    return res.status(200).json({
      message: "Success",
      questions: response.question,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const editQuestionController=async(req,res)=>{
    try {
        await questionService.editQuestion(req);
        return res.status(201).json({
            message:"Success question updated",
        })
    } catch (error) {
        errorHandler(res,error);
    }
}

const deleteQuestionController=async(req,res)=>{
    try {
        await questionService.deleteQuestion(req);
        return res.status(200).json({
            message:"Question deleted successfully"
        })
    } catch (error) {
        errorHandler(res,error)
    }
}

const getQuestionForTestController=async(req,res)=>{
  try {
    const response=await questionService.getQuestionForTest(req);
    return res.status(200).json({
      message:"Success",
      questions:response.question
    })
  } catch (error) {
    errorHandler(res,error)
  }
}
module.exports = {
  createQuesController,
  giveAnsController,
  getQuestionController,
  editQuestionController,
  deleteQuestionController,
  getQuestionForTestController
};
