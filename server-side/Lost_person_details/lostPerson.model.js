import mongoose from "mongoose";

// set schema/structure/rule
const lostPersonSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
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
