import joi from "joi";
import { SystemRoles } from "../../utils/system-roles.js";


export const signUpSchema={
    body:joi.object({
        firstname:joi.string().required(),
        lastname:joi.string().required(),
        email:joi.string().required().email(),
        username:joi.string(),
        password:joi.string().required().min(7),
        recoveryEmail:joi.string(),
        DOB:joi.string(),
        mobileNumber:joi.string().min(11).max(11),
        role:joi.string().valid(SystemRoles.SUBERADMIN,SystemRoles.USER)
    })
}