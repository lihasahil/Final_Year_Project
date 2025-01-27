import mongoose from "mongoose";

// set schema/structure/rule
const lostPersonSchema = new mongoose.Schema({
  video: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  height: {
    type: String,
    required: true,
    trim: true,
  },
  weight: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  missingDate: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 20,
  },
});

// create table/model/collection
const LostPerson = mongoose.model("LostPerson", lostPersonSchema);

export default LostPerson;
