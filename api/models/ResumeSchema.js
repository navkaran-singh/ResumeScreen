import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  name: String,
  skills: {
    type: [String],
  },
  location: String,
  position: String,
  degree: String,
  experience: Number,
  technical: Number,
  leadership: Number,
  teamwork: Number,
  communication: Number,
  aiScore: Number,
  details: String,
  certifications: {
    type: [String],
    default: [], // Default value as an empty array
  },
  // file_url: String, // Reference to storage location
  created_at: { type: Date, default: Date.now },
});

export const Candidate = mongoose.model("candidate", resumeSchema);
