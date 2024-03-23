import { Router } from "express";
import * as categorycontroller from './category.controller.js'
import { multerMiddleHost } from "../../middleware/MulterMiddle.js";
import { auth } from "../../middleware/authMiddleware.js";
import { allowedExtensions } from "../../utils/allowed-extensions.js";
import { SystemRoles } from "../../utils/system-roles.js";
import asynchandler from 'express-async-handler'
const router=Router()

router.post('/addcategory',auth(SystemRoles.SUBERADMIN),multerMiddleHost({
    Extensions:allowedExtensions.photo
}).single('photo'),asynchandler(categorycontroller.add_category))


router.put('/update/:categoryid',auth(SystemRoles.SUBERADMIN),multerMiddleHost({
    Extensions:allowedExtensions.photo
}).single('photo'),asynchandler(categorycontroller.update_category))







export default router