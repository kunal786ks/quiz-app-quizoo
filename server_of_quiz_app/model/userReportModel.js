const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  maximumMarks: {
    type: Number,
    required: true,
  },
  correctQuestions: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  notAttempted: {
    type: Number,
    requried: true,
  },
  wrongAns: {
    type: Number,
    required: true,
  },
  passStatus: {
    type: Boolean,
    default: false,
  },
  userExam: [
    {
      quesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      ansMarked: {
        type: String,
      },
    },
  ],
});

const reportModel = mongoose.model("Report", reportSchema);

module.exports = reportModel;
