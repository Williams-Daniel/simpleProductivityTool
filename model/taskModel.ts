import { Document, Schema, Types, model } from "mongoose";


interface iTask{
    title:string,
    priority:string,
    user:{}   
}

export interface iTaskData extends iTask,Document{}

const taskModel = new Schema({
    title:{
        type:String
    },
    priority:{
        type:String
    },
    user:{
        type:Types.ObjectId,
        ref:"user"
    }
})

export default model<iTaskData>("tasks",taskModel) 