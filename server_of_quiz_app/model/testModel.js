const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    testCategory:{
        type:String,
        requried:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    totalQuestions:{
        type:Number,
        required:true
    },
    MaximumMarks:{
        type:Number,
        required:true
    },
    passingMarks:{
        type:Number,
        required:true
    },
    time_to_finish: {
        type: String,
        required: true
    },
    remaingMarksQuestionsTobeAdded:{
        type:Number,
        default:0
    },
    instruction: [
        {
            type: String,
            required: true
        }
    ]
}, { timestamps: true })

const TestModel=mongoose.model('Test',testSchema)

module.exports=TestModel;