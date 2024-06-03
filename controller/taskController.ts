import { Request, Response } from "express";
import taskModel from "../model/taskModel";
import { HTTP, mainError } from "../error/mainError";
import authModel from "../model/authModel";
import mongoose from "mongoose";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { title, priority } = req.body;
    const user = await authModel.findById(userID);
    if (user) {
      const task = await taskModel.create({
        title,
        priority,
      });

      user?.tasks.push(new mongoose.Types.ObjectId(task?._id));
      user?.save();

      res.status(HTTP.CREATE).json({
        message: "Tasks has been created successfully",
        data: task,
      });
    } else {
      new mainError({
        name: "user not found",
        message: "user not found",
        status: HTTP.NOT_FOUND,
        success: false,
      });
    }
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Tasks couldn't be created",
      data: error.message,
    });
  }
};

export const getAllTask = async(req:Request,res:Response)=>{
  try {
    const allTask = await taskModel.find()
    res.status(HTTP.OK).json({
      message:"Gotten all task",
      data:allTask
    })
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).json({
      message:"Couldn't get all task",
      data:error.message
    })
  }
}

export const deleteTask = async(req:Request,res:Response)=>{
  try {
    const {taskID} = req.params
    const deletedTask = await taskModel.findByIdAndDelete(taskID)
    res.status(HTTP.OK).json({
      message:"Task deleted successfully",
      data:deletedTask
    })
  } catch (error) {
    res.status(HTTP.OK).json({
      message:"Task deleted successfully",
      error:error.message
    })
  }
}