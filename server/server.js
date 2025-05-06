const express= require("express")
const dotenv=require("dotenv")
const cors=require("cors") 
const connectDb=require("./config/database")
const app=express()
app.use(express.json())
dotenv.config()
connectDb()

app.use(cors({
    origin:process.env.FRONTEND_URI,
    credentials:true,
}))

app.listen(process.env.PORT,()=>console.log(`PORT is running on ${process.env.PORT}`))
