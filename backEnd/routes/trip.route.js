import express from "express";
import { deleteTrip, getAllTrips, getTrip, postTrip, putTrip } from "../controllers/trip.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
const router = express.Router();

 router.post("/",authenticateToken, postTrip);
 router.get("/",authenticateToken,getAllTrips);
 router.put("/:id",authenticateToken,putTrip);
 router.delete("/:id",authenticateToken,deleteTrip);
 router.get("/:id",authenticateToken,getTrip);
export default router;