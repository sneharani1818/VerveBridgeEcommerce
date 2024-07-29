import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
//Protecting Routes token base
export const requireSigIn = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode;
        next()
    } catch (err) {
        console.log(err)
    }
}

//admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            res.status(401).send({
                success: false,
                message: "Unauthorized Access",
            })
        }
        else {
            next()
        }
    } catch (err) {
        console.log(err)
        res.status(401).send({
            success: false,
            message: "Error in Admin middleware"
        })
    }
}