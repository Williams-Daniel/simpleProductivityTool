import { Request, Response } from "express";
import bcrypt from "bcrypt";
import authModel from "../model/authModel";
import { HTTP, mainError } from "../error/mainError";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = await authModel.create({
      userName,
      email,
      password: hashed,
    });
    res.status(HTTP.CREATE).json({
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
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
          data: user._id,
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
    res.status(HTTP.BAD_REQUEST).json({
      message: "Couldn't register user",
      data: error.message,
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const getAllUsers = await authModel.find();
    res.status(HTTP.OK).json({
      message: "Gotten all users",
      data: getAllUsers,
    });
  } catch (error) {
    res.status(HTTP.OK).json({
      message: "can't get all user",
      data: error.message,
    });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const oneUser = await authModel.findById(userID);
    res.status(HTTP.OK).json({
      message: "User found",
      data: oneUser,
    });
  } catch (error) {
    res.status(HTTP.OK).json({
      message: "can't find user",
      data: error.message,
    });
  }
};

export const getUserTask = async(req:Request,res:Response)=>{
  try {
    const {userID} = req.params
    const user = await authModel.findById(userID)
    if(user){
      const userTask = await user.populate({
        path:"tasks",
        options:{
          sort:{createAt:-1}
        }
      })
      res.status(HTTP.OK).json({
        message:"gotten user's tasks",
        data:userTask
      })
    }else{
      new mainError({
        name:"user not found",
        message:"user not found",
        status:HTTP.NOT_FOUND,
        success:false
      })
    }
  } catch (error) {
    res.status(HTTP.NOT_FOUND).json({
      message:"Couldn't get user's tasks",
      data:error.message
    })
  }
}