import express from "express";
import Hotel from "../models/hotel.js";
import createError from "../utils/error.js";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from "../controllers/hotel.js";

const router = express.Router();

//CREATE
router.post("/", createHotel);
//UPDATE
router.put("/:id", updateHotel);
//DELATE
router.delete("/:id", deleteHotel);

//GET
router.get("/:id", getHotel);

//GET ALL

router.get("/", getAllHotels);

export default router;
