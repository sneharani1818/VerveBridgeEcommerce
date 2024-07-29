import { hashPassword } from "../helpers/authHelper.js";
import { comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken";


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        //validation
        if (!name) {
            return res.send({ message: "Name is required" })
        }
        if (!email) {
            return res.send({ message: "Email is required" })
        }
        if (!password) {
            return res.send({ message: "Password is required" })
        }
        if (!phone) {
            return res.send({ message: "Phone is required" })
        }
        if (!address) {
            return res.send({ message: "Address is required" })
        }

        //check user
        const existinguser = await userModel.findOne({ email: email })
        //checking for existing user
        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: "Already registered user. Please login!"
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save()
        res.status(201).send({
            success: true,
            message: "User registered successfully!",
            user,
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            err
        })
    }
}


//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Invalid email or password!!"
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {

            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password!!"
            })
        }
        //token
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7D", });
        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in login!!",
            err
        })
    }
}

//test controller
export const testController = (req, res) => {
    res.send('Protected Routes')
}