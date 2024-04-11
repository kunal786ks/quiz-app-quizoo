const errorHandler = require("../lib/utils")
const reportService = require("../service/reportService")

const getReportController=async(req,res)=>{
    try {
        const response=await reportService.getUserReport(req);
        return res.status(200).json({
            message:"Success",
            userReport:response.reportFound
        })
    } catch (error) {
        errorHandler(res,error)
    }
}

module.exports={getReportController}