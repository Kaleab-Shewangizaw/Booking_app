import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// GET
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user, You are logged in!");
// });

// router.get("/checkuser", verifyUser, (req, res, next) => {
//   res.send(
//     "Hello user, You are logged in and you can delete or update your profile!"
//   );
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send(
//     "Hello admin, you are logged in and you can delete or update any user profile!"
//   );
// });

//CREATE

//UPDATE
router.put("/:id", verifyUser, updateUser);
//DELATE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL

router.get("/", verifyUser, getAllUsers);

export default router;
