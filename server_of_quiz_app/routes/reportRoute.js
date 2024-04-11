const express=require('express');
const { getReportController } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

const router=express.Router();

router.get('/get-report/:testId',protect,getReportController)

module.exports=router;