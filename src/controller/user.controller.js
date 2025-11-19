import { isObjectIdOrHexString, isValidObjectId } from 'mongoose';
import User from '../models/users.model.js';

async function signup(req, res) {
    let { username, email, password, dob } = req.body;
    try {
        let data = await User.findOne({
            $or: [{ email }, { username }]
        }).lean()

        if (data) return res.status(409).send({ "message": 'email or username not available', success: false })

        let newUser = new User({
            username, email, password, dob
        })

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully!",
            user: {
                username: newUser.username, email: newUser.email
            }
        })

    } catch (error) {
        console.log(error)
    }

}

async function getUsers(req, res) {
    try {
        let payload = {}
        if (req.params.userId) {
            payload['_id'] = req.params.userId;
        }
        let users = await User.find(payload, ['username', "email", "createdAt", "dob", "password"]);
        res.send(users);
    } catch (error) {
        console.log(error)
    }
}

async function deleteuser(req, res) {
    try {
        let { userId } = req.params;

        if (!isObjectIdOrHexString(userId) || !isValidObjectId(userId)) return res.status(400).send({ message: "No record found", success: false })

        let users = await User.findOneAndDelete({ _id: userId });
        if (users) {
            res.message({
                message: "User deleted Successfully",
                success: true
            })
        } else {
            res.status(400).json({
                message: "User not found",
                success: false
            })
        }
    } catch (error) {
        console.log(error)
    }
}

async function updateUserDetails(req, res) {
    try {
        let { userId } = req.params;
        let { password, username, dob } = req.body;

        if (!isObjectIdOrHexString(userId) || !isValidObjectId(userId)) return res.status(400).send({ message: "No record found", success: false })

        let users = await User.findOneAndUpdate({ _id: userId }, { password, username, dob });
        if (users) {
            res.status(200).json({
                message: "User details updated Successfully",
                success: true
            })
        } else {
            res.status(400).json({
                message: "User not found",
                success: false
            })
        }
    } catch (error) {
        console.log(error)
        res.status(503).send({ message: 'something went wrong.' })
    }
}

export { signup, getUsers, deleteuser, updateUserDetails }