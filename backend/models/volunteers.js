import { model, Schema} from "mongoose";

const VolunteerSchema = new Schema(
    {
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    phoneNumber: { type: String, required: true},
    location: { type: String, required: true},
    status: { type: Number, required: true },
    address: { type: String, required: true },
    },
    { versionKey: false, autoIndex: true}
);

export const VolunteerModel = model("Volunteer", VolunteerSchema)