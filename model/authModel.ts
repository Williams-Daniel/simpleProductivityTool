import { Document, Schema, Types, model } from "mongoose";


interface iAuth {
    userName: string,
    email:string,
    password:string,
    tasks:{}[]
}

export interface iAuthData extends iAuth,Document{}

const authModel = new Schema({
    name:{
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
    }]
},{timestamps:true})

export default model<iAuthData>("auths",authModel)