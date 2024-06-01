import express, { Application, Request, Response } from "express";
import cors from "cors";

const appConfig = (app: Application) => {
  app.use(express.json()).use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  ).get("/",(req:Request,res:Response)=>{
    try {
        res.status(200).json({
            message:"everything is working🚀🚀🚀"
        })
    } catch (error) {
        res.status(400).json({
            message:"Something is wrong somewhere🤕🤕"
        })
    }
  }).all("*",()=>{
    
  });
};
