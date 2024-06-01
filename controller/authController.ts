import { Request, Response } from "express";
import bcrypt from "bcrypt";
import authModel from "../model/authModel";
import { HTTP, mainError } from "../error/mainError";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await authModel.create({
      userName,
      email,
      password: hash,
    });
    return res.status(HTTP.CREATE).json({
      message: "User has been registered",
      data: newUser,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Couldn't register user",
      data: error.message,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({ email });
    if (user) {
      const confirmPassword = await bcrypt.compare(password, user?.password);
      if (confirmPassword) {
        res.status(HTTP.OK).json({
          message: "Welcome back",
        });
      } else {
        new mainError({
          name: "incorrect password",
          message: "password is incorrect",
          status: HTTP.NOT_FOUND,
          success: false,
        });
      }
    } else {
      new mainError({
        name: "invalid email",
        message: "incorrect email",
        status: HTTP.NOT_FOUND,
        success: false,
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Couldn't register user",
      data: error.message,
    });
  }
};

export const getUser = async(req:Request,res:Response)=>{
    try {
        const getAllUsers = await authModel.find()
        res.status(HTTP.OK).json({
            message:"Gotten all users",
            data:getAllUsers
        }) 
    } catch (error) {
        res.status(HTTP.OK).json({
            message:"can't get all user",
            data:error.message
        }) 
    }
}

export const getOneUser = async(req:Request,res:Response)=>{
    try {
        const {userID} = req.params 
        const oneUser = await authModel.findById(userID)
        res.status(HTTP.OK).json({
            message:"User found",
            data:oneUser
        }) 
    } catch (error) {
        res.status(HTTP.OK).json({
            message:"can't find user",
            data:error.message
        }) 
    }
}