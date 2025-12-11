import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

/*export function createUser(req, res) {

    const hashPassword =  bcrypt.hashSync(req.body.password , 10)

    const user = new User (
        {
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : hashPassword,
        }
    )

    user.save().then(
        () => {
            res.json ({
                message : "User created successfully"
            })
        }
    ).catch(
        (error) => {
            res.json ({ message : "User created failed", error :error })
        }
    )
}*/

export async function createUserAsync(req, res) {

    const hashPassword =  bcrypt.hashSync(req.body.password , 10)

    const user = new User (
        {
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : hashPassword,
        });

        try {
            await user.save();
            res.json({
                message : "User created successfully"
            });
        }
        catch(error) {
            res.json ({
                message : "User created failed", error: error 
            });
        }
}

export function loginUser(req,res) {

    User.findOne (
        {
            email : req.body.email
        }
    ).then (
        (user) => {
            if (user == null) {
                res.json({
                    message : "User with given email not found"
                })
            }else {

                const isPasswordValid = bcrypt.compareSync(req.body.password , user.password)

                if (isPasswordValid) {

                    const token = jwt.sign(
                        {
                            firstName : user.firstName,
                            lastName : user.lastName,
                            email : user.email,
                            role : user.role,
                            image : user.image,
                            isEmailVerified : user.isEmailVerified

                        } , "jwt-secret-54!"
                    )

                    res.json ({
                        message : "User login Successfull",
                        token : token
                    })
                } else {
                    res.status(401).json ({
                        message : "Invalid Password"
                    })
                }
            }
        }
    ).catch(
        () => {
            res.status(500).json(
            {
                message : "Internal server error"
            })
    })
}

export function isAdmin(req) {
    if (req.user == null) {
        return false;
    }
    if (req.user.role == "admin") {
        return true;
    }
    else {
        return false;
    }
}