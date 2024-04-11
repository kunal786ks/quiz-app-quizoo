const mongoose=require('mongoose');

const questionSchema=new mongoose.Schema({
    question_title:{
        type:String,
        required:true
    },
    questionChoices:[
        {
            type:String,
            required:true
        }
    ],
    correctAnswer:{
        type:String,
        required:true
    },
    testId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Test"
    },
    marksOfQuestions:{
        type:Number,
        required:true
    }
},{timestamps:true})


const questionModel=mongoose.model('Question',questionSchema);


module.exports=questionModel;