import { Router } from "express";
import asynchandler from 'express-async-handler'
import * as brandcontroller from './brand.controller.js'
import { allowedExtensions } from "../../utils/allowed-extensions.js";
import { multerMiddleHost } from "../../middleware/MulterMiddle.js";
import { auth } from "../../middleware/authMiddleware.js";
import { SystemRoles } from "../../utils/system-roles.js";

const router=Router()

router.post('/add',auth(SystemRoles.SUBERADMIN),multerMiddleHost({
    Extensions:allowedExtensions.photo
}).single('image'),asynchandler(brandcontroller.add_brand))



export default router