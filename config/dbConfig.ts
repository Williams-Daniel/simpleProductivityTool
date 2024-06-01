import mongoose from "mongoose";
import env from "dotenv"


env.config()

const DB_STRING = process.env.DB_STRING!

const dbConfig = ()=>{
    mongoose.connect(DB_STRING).then(()=>{
        console.log(`Database connected successfully`)
    })
}

export default dbConfig