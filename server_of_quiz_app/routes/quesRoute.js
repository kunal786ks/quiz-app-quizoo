const express=require('express');
const { createQuesController, giveAnsController } = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

const router=express.Router();

router.post('/add-ques',protect,createQuesController)
router.post('/ans',protect,giveAnsController)
module.exports=router;