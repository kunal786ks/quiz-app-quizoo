const reportModel = require("../model/userReportModel");

const getUserReport=async(req)=>{
    try {
        const testId=req.params.testId;
        const reportFound=await reportModel.findOne({testId,userId:req.user._id}).populate("testId").populate("userExam.quesId");
        if(!reportFound){
            throw Object.assign(new Error(),{name:"NOT_FOUND",message:"Doesn't Found the report of this test"})
        }
        console.log(reportFound);
        return {reportFound}      
    } catch (error) {
        throw error;
    }
}

const reportService={
    getUserReport   
}

module.exports=reportService;