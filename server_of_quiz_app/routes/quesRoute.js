const express = require("express");
const {
  createQuesController,
  giveAnsController,
  getQuestionController,
  editQuestionController,
  deleteQuestionController,
  getQuestionForTestController,
} = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-ques", protect, createQuesController);
router.post("/ans", protect, giveAnsController);

router.get("/get-ques/:testId", protect, getQuestionController);
router.get("/test/:testId",protect,getQuestionForTestController)

router.put("/update-ques", protect, editQuestionController);

router.put("/delete-ques", protect, deleteQuestionController);

module.exports = router;
