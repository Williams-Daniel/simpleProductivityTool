import { Request, Response } from "express";
import { HTTP, mainError } from "./mainError";



const prepError = (err:mainError,req:Request,res:Response)=>{
    res.status(HTTP.BAD_REQUEST).json({
        name:err.name,
        message:err.message,
        status:err.status,
        success:err.success,
        stack:err.stack,
        err
    })
}

export const errorHandler = (err:mainError,req:Request,res:Response)=>{
    prepError(err,req,res)
}