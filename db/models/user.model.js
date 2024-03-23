import mongoose from "mongoose";
import { SystemRoles } from "../../src/utils/system-roles.js";

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    recoveryEmail: { type: String },
    DOB: { type: Date, required: true },
    mobileNumber: { type: String, unique: true, min: 11, max: 100 },
    role: {
    type: String,
    enum: [SystemRoles.USER, SystemRoles.SUBERADMIN],
    required: true,
    default: SystemRoles.USER,
    },
    status: { type: String, enum: ["online", "offline"], default: "offline" },
});

const User=mongoose.model('User',userSchema)

export default User
