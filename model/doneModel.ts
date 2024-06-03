import { Document, Schema, Types, model } from "mongoose";


interface iDone {
    title:string,
    priority:string,
    auth:{}    
}

export interface iDoneData extends iDone, Document{}

const doneModel = new Schema({
    title:{
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


export default model<iDoneData>("dones",doneModel)