const errorHandler = require("../lib/utils")
const questionService = require("../service/questionService")

const createQuesController = async (req, res) => {
    try {
        const response = await questionService.createQuestions(req);
        return res.status(201).json({
            success: "True",
            question: response.question
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

const giveAnsController = async (req, res) => {
    try {
        const response = await questionService.answerQuestion(req);
        return res.status(200).json({
            message: "Success",
            userAnalytics:response.userData
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports = { createQuesController, giveAnsController }