import express from "express";
import LostPerson from "./lostPerson.model.js";
import isValidUser from "../middleware/authentication.middleware.js";
import router from "../User/user.controller.js";
import mongoose from "mongoose";
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (!fs.existsSync("public")) {
//       fs.mkdirSync("uploads");
//     }
//     if (!fs.existsSync("uploads/videos")) {
//       fs.mkdirSync("uploads/videos");
//     }
//     cb(null, "uploads/videos");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const multer = multer({
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     var ext = path.extname(file.originalname);
//     if (ext !== ".mkv" && ext !== ".mp4") {
//       return cb(new Error("Only Videos are allowed"));
//     }
//     cb(null, true);
//   },
// });
const router1 = express.Router();

//Add LOst Person Details

router.post("/lostPerson/add", isValidUser, async (req, res) => {
  // extract new lost person from req.body
  const newLostPerson = req.body;
  // add lost person
  await LostPerson.create(newLostPerson);
  //   send res
  return res.status(201).send({ message: "lost person added successfully" });
});
//   list lostPerson
router.get("/lostPerson/list", isValidUser, async (req, res) => {
  const lostPerson = await LostPerson.find();
  return res
    .status(200)
    .send({ message: "success", lostPersonList: lostPerson });
});
//get lostPerson details by id
router.get("/lostPerson/details/:id", isValidUser, async (req, res) => {
  try {
    const lostPersonId = req.params.id;

    // Check if it's a valid MongoDB ObjectId
    if (!mongoose.isValidObjectId(lostPersonId)) {
      return res.status(400).send({ message: "Invalid MongoDB ID" });
    }

    // Find lost person by ID
    const lostPersonItem = await LostPerson.findById(lostPersonId);

    // If person not found, return 404
    if (!lostPersonItem) {
      return res.status(404).send({ message: "Person doesn't exist" });
    }

    // Return success response
    return res
      .status(200)
      .send({ message: "Success", lostPersonDetail: lostPersonItem });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router1;
