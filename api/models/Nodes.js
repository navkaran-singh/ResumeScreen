import mongoose from "mongoose";

const NodeSchema = new mongoose.Schema({
  // MongoDB Doesn't Enforce Uniqueness Inside sub documents, which is why marking this id unique wont do anything
  id: { type: Number, required: true },
  name: { type: String, required: true },
  experience: { type: Number, required: true },
  aiScore: { type: Number, required: true },
  skills: [{ type: String, required: true }],
  email: { type: String, unique: true, required: true },
  details: { type: String },
});

const NodesSchema = new mongoose.Schema({
  resumes: [NodeSchema],
  createdAt: { type: Date, default: Date.now() },
});

export const Nodes = mongoose.model("Node", NodesSchema);

/*
Mongo db is a schema less database that stores documents where each document is a json object that contains
properties in the form of key value pair.
*/
