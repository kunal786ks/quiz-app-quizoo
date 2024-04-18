const express = require("express");
const {
  createTestController,
  getTestWithLimitAndPage,
} = require("../controllers/testController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-test", protect, createTestController);

router.get("/get-test", protect, getTestWithLimitAndPage);


module.exports = router;
