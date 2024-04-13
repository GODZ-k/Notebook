import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Twilio from "twilio";

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

let OTP, getUser;
// generate access and refresh token -----------------

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new APIError(500, "Error generating access");
    }
};

const generateOtp = async(length) => {
    let digits = "0123456789";
    OTP = "";
    for (let i = 0; i <= length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
};

// register user --------------------------------

const registeruser = asyncHandler(async(req, res) => {
    try {
        // Algo :-

        // get user details from frontend
        // validation - non empty fields
        // check is user already exists :- username , email
        // check image and avatar
        // upload them to the cloudinary server
        // create user obj :- create enter in database
        // remove password and refresh token field from response
        // check for user creation
        // return response

        const { username, password, phoneNo } = req.body;


        const array = [username, password, phoneNo];

        // validate fields
        if (array.some((field) => field === "")) {
            return res
                .status(422)
                .json(new ApiResponse(400, {}, "All fields must be equire"));
        }
        // user existance check
        const existedUser = await User.findOne({
            $or: [{ username }, { phoneNo }],
        });

        if (existedUser) {
            return res
                .status(422)
                .json(new ApiResponse(422, {}, "User already exists"));
        }


        getUser = {
            username,
            phoneNo,
            password,
        };


        generateOtp(4); // otp generation
        // console.log("generated otp", generatedOtp.spl)
        // console.log(OTP)
        console.log(typeof username, typeof Number(phoneNo), typeof password)

        const message = await client.messages.create({
            body: `your otp verification for user ${username} is ${OTP}`,
            from: "+15166906933", // Your Twilio phone number
            to: `+91${Number(phoneNo)}`, // Recipient's phone number
        });

        console.log("Message sent. SID:", message);

        console.log("start", OTP);

        return res
            .status(200)
            .json(new ApiResponse(200, message, "Otp sent successfully"));

    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, {}, "Internal server error"));
    }
});

// verify otp

const verifyOtp = asyncHandler(async(req, res) => {
    try {
        console.log(getUser, OTP)
            // console.log(getUser.username, getUser.password, getUser.phoneNo)
        const userOtp = req.body.otp;

        console.log(typeof Number(userOtp), typeof Number(OTP))

        if (Number(userOtp) !== Number(OTP)) {
            return res.status(400).json(new ApiResponse(400, {}, "Invalid Otp"));
        }

        const user = await User.create({
            phoneNo: getUser.phoneNo,
            password: getUser.password,
            username: getUser.username.toLowerCase(),
        });

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        if (!createdUser) throw new APIError(500, "Internal server error");

        return res
            .status(201)
            .json(new ApiResponse(200, createdUser, "User created successfully"));
    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, {}, "Internal server error"));
    }
});

// login user --------------------------------

const loginuser = asyncHandler(async(req, res) => {
    try {
        // req.body => data
        // username and email
        // find user
        // password check
        // access and refresh token
        // send cookies
        const { username, phoneNo, password } = req.body;

        if (!(username || phoneNo)) {
            return res.status(400).json(
                new ApiResponse(400, {}, "username and phone no is required")
            )
        }

        const user = await User.findOne({ $or: [{ username }, { phoneNo }] });

        if (!user) {
            return res.status(400).json(
                new ApiResponse(400, {}, "user not found")
            )
        }

        const ispasswordValid = await user.isPasswordCorrect(password);

        if (!ispasswordValid) {
            return res.status(400).json(
                new ApiResponse(400, {}, "Incorrect password")
            )
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
            user._id
        );

        // option  => send to the user obj to user
        const loggedInUser = await User.findById(user._id).select(
            "-password  -refreshToken"
        );

        // res.cookie
        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200, { user: loggedInUser, accessToken: accessToken, refreshToken: refreshToken },
                    "User logged in successfully"
                )
            );
    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, {}, "Internal server error"));
    }
});

// logout user --------------------------------

const logoutuser = asyncHandler(async(req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id, {
                $unset: {
                    refreshToken: 1, // this removes the field from document
                },
            }, {
                new: true,
            }
        );

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .clearCookie("refreshToken", options)
            .clearCookie("accessToken", options)
            .json(new ApiResponse(200, {}, "User logged out successfully"));
    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, {}, "Internal server error"));
    }
});

// get current user ---------------------------------

const getCurrentUser = asyncHandler(async(req, res) => {
    try {
        return res
            .status(200)
            .json(
                new ApiResponse(200, req.user, "Current user fetched successfully")
            );
    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, {}, "Internal server error"));
    }
});

// exports --------------------------------------------

export {
    registeruser,
    loginuser,
    logoutuser,
    verifyOtp,
    getCurrentUser,
};