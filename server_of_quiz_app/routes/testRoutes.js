const express = require('express');
const { createTestController } = require('../controllers/testController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/create-test',protect, createTestController)

module.exports = router;