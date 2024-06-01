import express, { Application } from "express"
import env from "dotenv"
import dbConfig from "./config/dbConfig"
import appConfig from "./appConfig"

env.config()
const port:number = parseInt(process.env.PORT!)

const app:Application = express()

appConfig(app)
const server = app.listen(port,()=>{
    console.log(`A server is listening on port:${port}`)
    dbConfig()
})

process.on("uncaughtException",(error:Error)=>{
    console.log(`uncaughtException error: ${error}`)
    process.exit(1)
})

process.on("unhandledRejection",(reason:any)=>{
    console.log(`unhandledRejection: ${reason}`)
    server.close(()=>{
        process.exit(1)
    })
})