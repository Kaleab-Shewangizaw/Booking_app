import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// GET
router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("Hello user, You are logged in!");
});

router.get("/checkuser", verifyUser, (req, res, next) => {
  res.send(
    "Hello user, You are logged in and you can delete or update your profile!"
  );
});

//CREATE

//UPDATE
router.put("/:id", updateUser);
//DELATE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL

router.get("/", getAllUsers);

export default router;
