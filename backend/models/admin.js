import { model, Schema } from "mongoose";

const AdminSchema = new Schema (
    {
        firstName: { type: String, required: true},
        lastName: { type: String, required: true},
        password: { type: String, required: true},
    },
    { versionKey: false, autoIndex: true},
);

export const AdminModel = model("AdminModel", AdminSchema);