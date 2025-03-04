import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendResetSuccessful, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

dotenv.config();

export const signup = async(req,res) => {
    const {email,password,name} = req.body;

    try{
        if(!email || !password || !name){
            return res.status(400).json({success: false, message:"All fields are required"});
        }
        const isUser = await User.findOne({email: email});
        if(isUser){
            return res.status(400).json({success: false, message: " User already exists"});
        }
        const hashPassword = await bcryptjs.hash(password,10);
        const verificationToken =  Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,password: hashPassword,name,verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 *60*60*1000
        });
        await user.save();
         
        generateTokenAndSetCookie(res,user._id);

        await sendVerificationEmail(user.email, verificationToken);


        res.status(201).json({success: true, message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });


    }catch(error){
         console.log("Error during registration", error.message);
         res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}


export const verifyEmail = async (req,res) => {

    const {code} = req.body;
    try{
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        });

        if(!user){
            return res.status(400).json({success:false, message:"Invalid or expired verification code"})
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
         res.status(200).json({success:true, message:"Email verified successfully",user :{
                ...user._doc,
                password: undefined,
            },
    });

    }catch(error){
    console.log("Error in verifyEmail",error.message);
    res.status(500).json({success: false, message: "Server error"});
    }
}


export const login = async(req,res) => {
        const {email,password} = req.body;
            try {
                const user = await User.findOne({email});
                if(!user){
                    return res.status(400).json({success: false, message: "Invalid email"});
                }
                if(!password){
                    return res.status(400).json({success: false, message: "Incorrect password"});
                }
                const isPasswordValid = await bcryptjs.compare(password,user.password);
            
                if(!isPasswordValid){
                    return res.status(400).json({success: false, message: "Incorrect password"});
                }
                generateTokenAndSetCookie(res,user._id);

                user.lastlogin = new Date();
                await user.save();
                res.status(200).json({
                    success: true,
                    message: "Login successful",
                    user: {
                        ...user._doc,
                        password: undefined,
                        }
                });
            } catch (error) {
                console.log("Error in login",error.message);
                res.status(400).json({success: false, message: error.message});
            }        


}


export const logout = async(req,res) => {
    res.clearCookie("token");
    res.status(200).json({success:true, message: "Logged out successfully"});

}

export const forgotPassword = async(req,res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: "User not found"});
        }
        //Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiresAt = Date.now() +1 *60 * 60 * 1000; //24 hours

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();
        //send email 
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(200).json({success: true, message: "Password reset link sent to your email"});
    } catch (error) {
        console.log("Error in forgotPassword:",error);
        res.status(400).json({success: false, message: error.message});
    }
}

export const resetPassword = async(req,res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;
        if(!password){
            return res.status(400).json({success: false, message: "Enter new password"});
   
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()},
        });
        if(!user){
            return res.status(400).json({success: false, message: "Invalid or expired reset token"});
        }
        const hashedPassword =await bcryptjs.hash(password,10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessful(user.email);

        res.status(200).json({success: true, message:"Password reset successful"});
    } catch (error) {
        console.log("Error in resetPassword:",error);
        res.status(400).json({success: false, message: error.message});
    }

}

export const checkAuth = async(req,res) =>{
    const userId = req.userId;
    try {
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(400).json({success: false,message: "User not found"});
        }
        res.status(200).json({success: true, user: user});
    } catch (error) {
        console.log("Error in checkAuth",error.message);
        res.status(400).json({success: false, message: error.message});
    }
}