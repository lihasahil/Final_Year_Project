import express from "express";
import LostPerson from "./lostPerson.model.js";
import isValidUser from "../middleware/authentication.middleware.js";
import router from "../User/user.controller.js";

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
//   list item food
router.get("/lostPerson/list", isValidUser, async (req, res) => {
  const lostPerson = await LostPerson.find();
  return res
    .status(200)
    .send({ message: "success", lostPersonList: lostPerson });
});

export default router1;
