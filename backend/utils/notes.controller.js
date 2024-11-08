import mongoose from "mongoose";
import Note from "../models/note.model.js";

export const getNotes = async (req, res) => {
    const { user } = req.body;
    if(user !== '') {
        try {
            const notes = await Note.find({ userId: user });
            res.status(200).json({ success: true, data: notes});
        } catch (error) {
            res.status(500).json({ success: false, message: "Server error"});
        }
    } else {
        res.json({ success: false, message: "User ID is required"});
    }  
}

export const postNotes = async (req, res) => {
    const note = req.body;

    const {body, colors, position, userId } = note;
    if(!body || !colors || !position || !userId) {
        res.status(400).json({ success: false, message: "All the detials are required" });
    }
    
    const newNote = new Note(note);

    try {
        await newNote.save();
        res.status(201).json({ success: true, data: newNote});
    } catch (error) {
        console.log(`Error occred: ${error.message}`);
        res.status(200).json({ success: true, message: "Failed to create note"});
    }
}

export const putNotes = async (req, res) => {
    const { id } = req.params;
    const note = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid note id"});
    }

    try {
        const updatedNote = await Note.findByIdAndUpdate(id, note, {new: true});
        res.status(200).json({ success: true, data: updatedNote});
    } catch (error) {
        console.log(`Error occred in updation: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to update note"});
    }
}

export const deleteNotes = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid note id"});
    }

    try {
        await Note.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
        console.log(`Error occred in deletion: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to delete note"});
    }
}