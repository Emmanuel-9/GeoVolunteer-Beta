import { model, Schema } from "mongoose";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const AdminSchema = new Schema (
    {
        firstName: { type: String, required: true},
        lastName: { type: String, required: true},
        password: { type: String, required: true},
        emailId: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isSuperAdmin: { type: Boolean, required: true },
        location: { type: { lat: Number, lng: Number }, required: true },
    },
    { versionKey: false, autoIndex: true},
);

adminSchema.plugin(uniqueValidator);

export const AdminModel = model("AdminModel", AdminSchema);