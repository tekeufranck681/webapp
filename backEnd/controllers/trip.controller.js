import mongoose from "mongoose";
import Trip from "../models/trip.model.js";
export const postTrip = async(req,res) => {
    const {name,imageURL,departure,destination,duration,budget} = req.body;
    const userId = req.userId;
    if(!name || !departure ||!destination || !duration || !budget){
       return res.status(400).json({success: false, message: "Enter all fields"});
    }
  
    try{
        const isTrip = await Trip.findOne({name: name,userId: userId});
    if (isTrip){
        return res.status(409).json({success: false, message:`There exists already a trip named: ${name}`});
    }

    const newTrip  = await Trip.create({name,imageURL,departure,destination,duration,budget,userId});
  
    res.status(201).json({success: true, data: newTrip, message:"Trip added successfully"});
    }catch(error){
        console.log("Error:", error.message);
        res.status(500).json({success: false, message:"Server Error"});
    }
}

export const getAllTrips = async(req,res) => {
    
    try{
        const userId = req.userId; // Extracts user's Id from jwt token
        const Trips = await Trip.find({userId});
        res.status(200).json({success: true, data: Trips});
    }catch(error){
        res.status(500).json({success: false, message:"Server Error"});
        console.error("Error at fetching all Trips",error.message);
    }
}


export const putTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Trip ID" });
    }

   
    const existingTrip = await Trip.findOne({ _id: id, userId: userId });
    if (!existingTrip) {
      return res.status(404).json({ success: false, message: "Trip Not Found" });
    }

    // Destructure request body
    const { name, destination, departure, budget, duration, imageURL } = req.body;

    if (!name && !departure && !destination && !duration && !budget && !imageURL) {
      return res.status(400).json({ success: false, message: "No changes made" });
    }

    // Check if another trip exists with the same name for the same user
    if (name) {
      const duplicateTrip = await Trip.findOne({ name: name, userId: userId, _id: { $ne: id } });
      if (duplicateTrip) {
        return res.status(409).json({
          success: false,
          message: `A trip with name ${name} already exists`,
        });
      }
    }
    const updateData = {};
    if (name) updateData.name = name;
    if (departure) updateData.departure = departure;
    if (destination) updateData.destination = destination;
    if (budget) updateData.budget = budget;
    if (imageURL) updateData.imageURL = imageURL;
    if (duration) updateData.duration = duration;

    await Trip.updateOne({ _id: id, userId: userId }, { $set: updateData });
   
    const updatedTrip = await Trip.findOne({ _id: id, userId: userId });

    res.status(200).json({
      success: true,
      message: "Trip updated successfully",
      data: updatedTrip,
    });
  } catch (error) {
    console.error("Error at Updating Trip:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const deleteTrip = async(req,res) =>{
    const {id} = req.params;
    const userId = req.userId;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Product not found"});
    }
    try{
       
         await Trip.deleteOne({_id:id,userId:userId});
        res.status(200).json({success: true, message: "Trip deleted Succesfully"});
    }catch(error){
        res.status(500).json({succes: false, message: "Server Error"});
        console.error("Error At Deleting Trip",error.message);
    }
}

export const getTrip = async(req,res) => {
    const {id} = req.params;
    const userId = req.userId;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Trip not found"});
    }
     try{
        const existingTrip = await Trip.findOne({_id: id,userId: userId});
        res.status(200).json({success: true, data: existingTrip});
     }catch(error){
        res.status(500).json({success: false, message: "Server Error"});
     }
}