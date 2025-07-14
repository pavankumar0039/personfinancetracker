import mongoose from "mongoose";

const householdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:"true"
    }
}, {
    timestamps: true,
});


export default mongoose.models.Household || mongoose.model('Household', householdSchema);
