import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import verify  from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: true }) //save refreshToken in db

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(500, "generating refresh and access token failed");
  }
}

const registerUser = asyncHandler(async (req, res) => {

  const { userName, email, password } = req.body;

  console.log("user data", req.body)

  if ([userName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ $or: [{ userName }, { email }] });

  if (existedUser) throw new ApiError(400, "user already existed");

  const user = await User.create({
    userName: userName.toLowerCase(),
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  if (!createdUser) throw new ApiError(500, "Registering user failed");

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdUser, "User registered Successfully!!")
    );
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, userName, password } = req.body;

  if (!password) {
    throw new ApiError(400, "password is required")
  }

  if (!email && !userName) {
    throw new ApiError(400, "email or userName is required");
  }

  const user = await User.findOne({
    $or: [{ userName }, { email }]
  });

  if (!user) throw new ApiError(404, "user does not exist");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid password credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = { httpOnly: true, secure: true };


  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser, accessToken
        },
        "User logged in successfully!!"
      )
    )

})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id,
    {
      $set: {
        refreshToken: undefined
      },
      $unset: {
        refreshToken: 1
      }
    },
    {
      new: true
    } // pass new: true to get response of updated refreshToken
  )

  const options = {
    httpOnly: true,  //for cookies can only modify by server
    secure: true
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incommingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;

  if (!incommingRefreshToken) throw new ApiError(401, "unauthorized request");

  try {
    const decodedToken = verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id)

    if (!user) throw new ApiError(401, "invalid refresh token");

    if (incommingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true
    }

    const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(req.user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "AccessToken refresh successfully"
        )
      )
  } catch (error) {
    if (error) {
      return res
        .status(400)
        .json(new ApiError(400, error?.message || "Invalid refresh token"))
    }
  }
})  

const getCurrentUser = asyncHandler(async (req, res)=> {
  return res
  .status(200)
  .json(new ApiResponse(200, req.user, "current user fetched successfully"))
})

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser
}