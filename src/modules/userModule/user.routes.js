import { Router } from 'express';
import asyncHandler from 'express-async-handler'
import * as usercontroller from '../userModule/user.controller.js'
import { validationMiddleware } from '../../middleware/validation.middleware.js';
import { signUpSchema } from './user.valiation.js';

const router=Router()

router.post('/signup',validationMiddleware(signUpSchema),asyncHandler(usercontroller.Sign_up))

router.post('/login',asyncHandler(usercontroller.Sign_in))







export default router;
