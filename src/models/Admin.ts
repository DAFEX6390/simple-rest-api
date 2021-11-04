import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    }
});

export default model("admin", AdminSchema);