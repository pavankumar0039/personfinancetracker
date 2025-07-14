
const initDB = require('../database/db');
const householdModel = require('../models/householdModel');
const transactionModel = require('../models/transactionModel');

initDB();

const getHousehold = async (householdId) => {
    try {
        const household = await householdModel.findById(householdId).populate('transactions');
        if (!household) {
            throw new Error("Household not found");
        }
        return household;
    } catch (error) {
        throw new Error("Failed to fetch household");
    }
}

const getHouseholds = async (userId) => {
    try {
        const households = await householdModel.find({ user: userId }).populate('transactions');
        return households;
    } catch (error) {
        throw new Error("Failed to fetch households");
    }
}
const createHousehold = async (householdData) => {
    try {
        const household = new householdModel(householdData);
        await household.save();
        return household;
    } catch (error) {
        throw new Error("Failed to create household");
    }
};

const addTransactionToHousehold = async (householdId, transactionData) => {

    try {
        const household = await householdModel.findById(householdId);
        if (!household) {
            throw new Error("Household not found");
        }
        const transaction = new transactionModel(transactionData);
        transaction.household = householdId;
        await transaction.save();
        household.transactions.push(transaction._id);
        await household.save();

        const updatedHousehold = await householdModel.findById(householdId).populate('transactions');
        return updatedHousehold;

    } catch (error) {

        throw new Error(error.message);
    }
}


const updateTransactionInHousehold = async (householdId, transactionId, transactionData) => {
    try {
        const household = await householdModel.findById(householdId);
        if (!household) {
            throw new Error("Household not found");
        }
        const transaction = await transactionModel.findByIdAndUpdate(transactionId, transactionData, {
            new: true,
            runValidators: true,
        });
        if (!transaction) {
            throw new Error("Transaction not found");
        }
        const updatedHousehold = await householdModel.findById(householdId).populate('transactions');
        return updatedHousehold;
    } catch (error) {
        throw new Error("Failed to update transaction in household");
    }
}
const deleteTransactionFromHousehold = async (householdId, transactionId) => {
    try {
        const household = await householdModel.findById(householdId);
        if (!household) {
            throw new Error("Household not found");
        }
        const transaction = await transactionModel.findByIdAndDelete(transactionId);
        if (!transaction) {
            throw new Error("Transaction not found");
        }
        household.transactions = household.transactions.filter(
            (id) => id.toString() !== transactionId
        );
        await household.save();

        const updatedHousehold = await householdModel.findById(householdId).populate('transactions');
        return updatedHousehold;
    } catch (error) {
        throw new Error("Failed to delete transaction from household");
    }
}


const householdControllers = {
    getHousehold,
    getHouseholds,
    createHousehold,
    addTransactionToHousehold,
    updateTransactionInHousehold,
    deleteTransactionFromHousehold
};

module.exports = { householdControllers };