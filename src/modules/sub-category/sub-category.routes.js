import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { multerMiddleHost } from "../../middleware/MulterMiddle.js";
import { allowedExtensions } from "../../utils/allowed-extensions.js";
import { SystemRoles } from "../../utils/system-roles.js";
import * as subcontroller from './sub-category.controller.js'
import { auth } from "../../middleware/authMiddleware.js";

const router=Router()

router.post('/:categoryId',auth(SystemRoles.SUBERADMIN),multerMiddleHost({
    Extensions:allowedExtensions.photo
}).single('photo'),asyncHandler(subcontroller.add_subCategory))






export default router