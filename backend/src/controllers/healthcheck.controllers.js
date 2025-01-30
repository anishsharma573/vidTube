import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const healthCheck = asyncHandler(async (req,res)=>{
    const data = {
        name:"anish",
        healthCheck:"ok",
        
    }
    return res
    .status(200)
    .json(data)
})

export {healthCheck}