import { Document, Schema, Types, model } from "mongoose";



export interface iProgress{
    task:string,
    priority: string,
    auth:{}
}

export interface iProgressData extends iProgress,Document{}

const progressModel = new Schema({
    task:{
        type:String
    },
    priority:{
        type:String
    },
    auth:{
        type: Types.ObjectId,
        ref:"auths"
    }
})

export default model<iProgressData>("progress",progressModel)