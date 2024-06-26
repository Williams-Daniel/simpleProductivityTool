import { Document, Schema, Types, model } from "mongoose";


interface iTask{
    title:string,
    priority:string,
    auth:{}   
}

export interface iTaskData extends iTask,Document{}

const taskModel = new Schema({
    title:{
        type:String
    },
    priority:{
        type:String
    },
    auth:{
        type:Types.ObjectId,
        ref:"auths"
    }
})

export default model<iTaskData>("tasks",taskModel) 