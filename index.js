import express from "express"
import mongoose from "mongoose"
import userRouter from "./routers/userRouter.js"
import authorizedUser from "./lib/jwtMiddleware.js"
import productRouter from "./routers/productRouter.js"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI).then(
    () => {
        console.log("Connected to mongodb")
    }
).catch(
    () => {
        console.log("Error connecting to mongodb")
    }
)

const app = express()

app.use(cors())
app.use(express.json())

app.use(authorizedUser)

//Connect with Routers
app.use("/api/users",userRouter)
app.use("/api/products",productRouter)

app.listen(3000,
    () => {
        console.log("Server Started") 
    }
)