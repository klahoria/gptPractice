import { isObjectIdOrHexString, isValidObjectId } from 'mongoose';
import User from '../models/users.model.js';
import { generateAccessToken, generateRefreshToken } from '../middleware/jwt/jwt.token.js'
import userDevices from '../models/users.deivces.model.js';
import jwt from "jsonwebtoken";


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

async function userLogin(req, res) {
    const { email, password } = req.body;

    const users = await User.findOne({ email }).lean();
    if (!users) return res.status(401).send({ message: "Invalid credentials" });

    // Compare password...

    let user = new userDevices({});
    let id = String(users._id);
    const accessToken = generateAccessToken({ id });
    const refreshToken = generateRefreshToken({ id });

    // Save refresh token in DB
    user.refresh_token = refreshToken;
    user.auth_token = accessToken;
    user.user_id = users["_id"];
    await user.save();

    // Send refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
    });

    return res.send({
        accessToken,
        message: "Login successful",
    });
}
async function refreshToken(req, res) {
    const token = req.cookies.refreshToken;

    if (!token) return res.status(401).send({ message: "No refresh token provided" });

    // Verify refresh token
    jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
        if (err) return res.status(403).send({ message: "Invalid refresh token" });

        const user = await userDevices.findOne({ user_id: decoded.id, id_deleted: 0 }).sort({ createdAt: -1 });
        if (!user || user.refresh_token !== token) {
            return res.status(403).send({ message: "Refresh token mismatch" });
        }

        // Generate new access token
        const newAccessToken = generateAccessToken({ id: user['user_id'] });

        // OPTIONAL: rotate refresh token
        const newRefreshToken = generateRefreshToken({ id: user['user_id'] });
        user.refresh_token = newRefreshToken;
        await user.save();

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        return res.send({ accessToken: newAccessToken });
    });
}

async function logout(req, res) {
    const token = req.cookies.refreshToken;

    if (token) {
        const decoded = jwt.decode(token);
        await userDevices.findOneAndUpdate({user_id: decoded.id, is_deleted: 0}, { refresh_token: null, is_deleted: 1, logout_at: new Date().toString() });
    }

    res.clearCookie("refreshToken");
    res.send({ message: "Logged out" });
}

export { signup, getUsers, deleteuser, updateUserDetails, userLogin, refreshToken, logout }