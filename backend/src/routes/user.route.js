import { Router } from "express";
import {
    loginuser,
    logoutuser,
    // refreshAccessToken,
    verifyOtp,
    registeruser,
    getCurrentUser
} from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()


// register 

router.route("/register").post(registeruser)

// verify User

router.route("/verify").post(verifyOtp)

// login

router.route("/login").post(loginuser)

// logout

router.route("/logout").post(verifyJWT, logoutuser)

//secured routes

// router.route("/refresh-token").post(refreshAccessToken)

// get current user

router.route("/current-user").get(verifyJWT, getCurrentUser)




export default router