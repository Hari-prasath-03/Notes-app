import { Schema, model } from "mongoose";

const noteSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    colors: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
},{
    timestamps: true
});

const Note = model("Note", noteSchema);
export default Note;