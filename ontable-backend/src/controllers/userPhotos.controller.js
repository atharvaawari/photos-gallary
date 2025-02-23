import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Photo } from "../models/photos.model.js";
import { asyncHandler } from "../utils/asyncHandler";


const uploadPhoto = asyncHandler( async (req, res)=>{
  if(!req.file){
    throw new ApiError(400, "No file Uploded");
  }

  const userId = req.user._id;

  //upload on cloudinary 
  //get image url from it
  //create photo modal of it and save 
  //update user photos count 
  //send success response
  //else throw error

})