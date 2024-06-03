import { Document, Schema, Types, model } from "mongoose";


interface iAuth {
    userName: string,
    email:string,
    password:string,
    tasks:{}[],
    inProgress:{}[],
    doneTask:{}[]
}

export interface iAuthData extends iAuth,Document{}

const authModel = new Schema({
    userName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    tasks:[{
        type:Types.ObjectId,
        ref:"tasks"
    }],
    inProgress:[{
        type:Types.ObjectId,
        ref:"progress"
    }],
    doneTask:[{
        type:Types.ObjectId,
        ref:"dones"
    }],
},{timestamps:true})

export default model<iAuthData>("auths",authModel)