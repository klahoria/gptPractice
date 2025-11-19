import express from 'express';
import { signup, getUsers, deleteuser, updateUserDetails } from '../controller/user.controller.js';
import RegisterUserData from '../vaildators/validationSchema/users.validator.js'
import DeleteuserSchena from '../vaildators/validationSchema/deleteUser.validator.js';
import UpdateUserSchema from './deleteUser.validator.js';

const route = express.Router();


route.get('/users', RegisterUserData, getUsers)
route.put('/udpate_user_details/:userId', UpdateUserSchema, updateUserDetails)
route.post('/signup', RegisterUserData, signup)
route.delete('/delete_users/:userId', DeleteuserSchena, deleteuser)

export default route;