import { Document, Schema, model } from "mongoose";


interface iAuth {
    userName: string,
    email:string,
    password:string
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
    }
},{timestamps:true})

export default model<iAuthData>("auths",authModel)