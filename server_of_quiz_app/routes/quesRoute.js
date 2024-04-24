const express = require("express");
const {
  createQuesController,
  giveAnsController,
  getQuestionController,
  editQuestionController,
  deleteQuestionController,
} = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-ques", protect, createQuesController);
router.post("/ans", protect, giveAnsController);

router.get("/get-ques", protect, getQuestionController);

router.put("/update-ques", protect, editQuestionController);

router.delete("/delete-ques", protect, deleteQuestionController);

module.exports = router;
