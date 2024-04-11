const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        requried:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})


const userModel=mongoose.model('User',userSchema);

module.exports=userModel;