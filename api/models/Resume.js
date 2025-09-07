import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  uploadDate: { type: Date, default: Date.now },
});

export const Resume = mongoose.model("Resume", FileSchema);
