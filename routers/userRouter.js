import express from "express"
import {createUserAsync, loginUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/",createUserAsync)
userRouter.post("/login",loginUser)

export default userRouter;