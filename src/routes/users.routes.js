import express from 'express';
import { signup, getUsers, deleteuser, updateUserDetails, userLogin, refreshToken, logout } from '../controller/user.controller.js';
import RegisterUserData from '../vaildators/validationSchema/users.validator.js'
import DeleteuserSchema from '../vaildators/validationSchema/deleteUser.validator.js';
import LoginUserSchema from '../vaildators/validationSchema/login.validator.js';
import UpdateUserSchemaBody from '../vaildators/validationSchema/udpateUser.validator .js';
import Auth, { RoleAuth } from "../middleware/jwt/auth.js"

const route = express.Router();


route.get('/users', Auth, RoleAuth(1,2,3), RegisterUserData, getUsers);
route.get('/users/:userId', RegisterUserData, getUsers);
route.put('/udpate_user_details/:userId', UpdateUserSchemaBody.params, UpdateUserSchemaBody.body, updateUserDetails);
route.post('/signup', RegisterUserData, signup);
route.delete('/delete_users/:userId',Auth, RoleAuth(1), DeleteuserSchema, deleteuser);
route.post('/login', LoginUserSchema, userLogin);
route.post('/refresh-token', refreshToken);
route.post('/logout', logout);

export default route;