import { model, Schema } from "mongoose";

const meetingSchema = new Schema({
    user_id: { type: String },
    meetingCOde: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true }
});

const Meeting = model("Meeting", meetingSchema);

export { Meeting };