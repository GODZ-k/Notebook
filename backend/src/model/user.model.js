import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchmea = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true
    },
    phoneNo: {
        type: Number,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true })

userSchmea.pre('save', async function(next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()

})

userSchmea.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchmea.methods.generateAccessToken = function() {
    return jwt.sign({
            _id: this._id,
        },
        process.env.SECRET_KEY, {
            expiresIn: process.env.TOKEN_EXPIRY
        })

}

userSchmea.methods.generateRefreshToken = function() {
    return jwt.sign({
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}

export const User = mongoose.model("User", userSchmea)