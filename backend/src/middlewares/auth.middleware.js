import { User } from "../model/user.model.js"
import Jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { APIError } from "../utils/ApiError.js"

export const verifyJWT = asyncHandler(async(req, _, next) => {

    try {
        console.log("start", req.headers)
        const Token = req.headers.authorization.split(" ")[1]
        console.log(Token)
        if (!Token) {
            throw new ApiResponse(401, " UnAuthorized request")
        }

        const decodedTokenInfo = Jwt.verify(Token, process.env.SECRET_KEY)

        const user = await User.findById(decodedTokenInfo ? decodedTokenInfo._id : null).select("-password -refreshToken")

        if (!user) {
            throw new APIError(401, "Invalid Access Token")
        }


        req.user = user
        next()

    } catch (error) {

        throw new APIError(500, error ? error.message : "Internal server error")

    }


})