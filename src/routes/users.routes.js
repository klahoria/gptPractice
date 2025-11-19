import express from 'express';
import { signup, getUsers, deleteuser, updateUserDetails } from '../controller/user.controller.js';
import RegisterUserData from '../vaildators/validationSchema/users.validator.js'
import DeleteuserSchema from '../vaildators/validationSchema/deleteUser.validator.js';
import udpateUserValidator from '../vaildators/validationSchema/udpateUser.validator .js';

const route = express.Router();


route.get('/users', RegisterUserData, getUsers)
route.get('/users/:userId', RegisterUserData, getUsers)
route.put('/udpate_user_details/:userId', udpateUserValidator.params, udpateUserValidator.body, updateUserDetails)
route.post('/signup', RegisterUserData, signup)
route.delete('/delete_users/:userId', DeleteuserSchema, deleteuser)

export default route;