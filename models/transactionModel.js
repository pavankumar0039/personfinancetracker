import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true,
    },
    account:{
        type: String,
        enum: ['Cash', 'Bank','Savings', 'credit_card'],
        required: true,
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    household: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Household',
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);;