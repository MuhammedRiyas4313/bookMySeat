import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import User from "../models/user.js";
import { sendOTP, otpVerification } from "../utils/twilioOTP.js";

export const registerUser = async (req, res) => {
  try {
    const allValuesDefined = Object.values(req.body).every((value) => value !== undefined);

    if (!allValuesDefined) {
        return res.status(400).json({ error: "One or more values are undefined" });
    }

    const { phone, name, password, isAdmin } = req.body;

    const oldUser = await User.findOne({ phone });

    // Check if a user with the provided email is already registered.

    if (oldUser) {
      return res.status(409).json({ status: "Mobile number is already registered!" });
    }

    const otp = await sendOTP(phone);
    req.session.mobile = phone;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userInstance = new User({
      name,
      phone,
      password: hashedPassword,
      isAdmin
    });

    userInstance.save((err) => {
        if (err) {
            throw new Error('User registration failed!');
        } else {
           res.status(201).json({ message: 'OTP sent to mobile number successfully'});
        }
      });
  } catch (error) {
    res.status(500).json({ error:error.message });
  }
};

export const verifyOTP = async (req,res) => {
    try {
        const { mobile } = req.session;
        const { otp } = req.body;
        const verification = await otpVerification(mobile,otp);

        if(verification === 'verified'){
            return res.status(201).json({ message: 'User registered successfully'});
        }else{
            return res.status(400).json({ error: verification });
        }
    
    } catch (error) {
        res.status(500).json({ error:error.message });
    }
}

export const login = async (req, res) => {
  try {
    const allValuesDefined = Object.values(req.body).every((value) => value !== undefined);

    if (!allValuesDefined) {
        return res.status(400).json({ error: "One or more values are undefined" });
    }
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        let token = null;
        if(user.isAdmin){
           token = jwt.sign(
            {
              id: user._id,
              role: process.env.ADMIN_JWT_ROLE,
            },
             process.env.ADMIN_JWT_SECRET,
            { expiresIn: "5h" }
          );
        }else{
           token = jwt.sign(
            {
              id: user._id,
              role: process.env.USER_JWT_ROLE,
            },
             process.env.USER_JWT_SECRET,
            { expiresIn: "5h" }
          );
        }
        res.status(200).json({ token });
      } else {
        return res.status(401).json({ error: "Incorrect password" });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
