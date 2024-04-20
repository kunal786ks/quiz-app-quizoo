const express = require("express");
const {
  createTestController,
  getTestWithLimitAndPage,
  getTestByIDController,
  getUserTestController,
  deleteTestController,
} = require("../controllers/testController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-test", protect, createTestController);

router.get("/user-test",protect,getUserTestController)
router.get("/get-test", protect, getTestWithLimitAndPage);
router.get("/:testId",protect,getTestByIDController);

router.delete("/delete-test/:testId",protect,deleteTestController)

module.exports = router;
