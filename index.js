import express from "express"
import mongoose from "mongoose"
import userRouter from "./routers/userRouter.js"
import authorizedUser from "./lib/jwtMiddleware.js"
import productRouter from "./routers/productRouter.js"

const mongoURI = "mongodb+srv://admin:1234@cluster0.ctioibl.mongodb.net/?appName=Cluster0"

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

app.use(express.json())

app.use(authorizedUser)

//Connect with Routers
app.use("/users",userRouter)
app.use("/products",productRouter)

app.listen(3000,
    () => {
        console.log("Server Started") 
    }
)