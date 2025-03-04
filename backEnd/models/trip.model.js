import mongoose from "mongoose";
 const tripSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    imageURL:{
        type: String,
        
    },
    userId:{
        type: String,
        required: true,
    },
    departure:{
        type: String,
        required: true,
    },
    destination:{
        type: String,
        required: true,
    },
    duration: {
        type: Number, 
        required: true,
    },
    budget: {
        type: Number,
        required: true
    }
 },
 {
    timestamps: true,
 }
);

const Trip = mongoose.model("Trip",tripSchema);
export default Trip;