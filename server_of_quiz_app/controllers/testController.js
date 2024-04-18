const errorHandler = require("../lib/utils")
const testService = require("../service/testService")

const createTestController=async(req,res)=>{
    try {
        const response=await testService.createTest(req);
        return res.status(201).json({
            message:"Success",
            test:response.test
        })
    } catch (error) {
        errorHandler(res,error)
    }
}


const getTestWithLimitAndPage=async(req,res)=>{
    try {
        const response=await testService.getAllTestWithPageAndLimit(req);
        return res.status(200).json({
            message:"Success",
            tests:response.test
        })
    } catch (error) {
        errorHandler(res,error)
    }
}



module.exports={createTestController,getTestWithLimitAndPage}