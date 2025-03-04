import mongoose from "mongoose";

 const expenseSchema = new mongoose.Schema({
            name:{
                type: String,
                required: true,
                unique: true,
            },
            amount:{
                type: Number,
                required:true,
            },
            userId:{
                type: String,
                required: true,
            },
            category:{
                type: String,
                enum: ["Food","Transport","Accomodation","Entertainment"],
                default: "Food",
                
            },
            date: {
                type: Date,
                default: Date.now

            }
        },
        {
            timestamps: true,
        }
);
const Expense = mongoose.model('Expense',expenseSchema);
export default Expense;