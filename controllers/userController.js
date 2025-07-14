const initDB = require('../database/db');
const User = require('../models/userModel');

initDB();

const getUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw new Error("Failed to fetch user");
    }
}

const getUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error("Failed to fetch users");
    }
}
const checkUser = async (userData) => {
  try {
    const user = await User.findOne({
      email: userData.email,
      password: userData.password, // Note: hash in production!
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    return user;
  } catch (error) {
    throw new Error(`User check failed: ${error.message}`);
  }
}
const createUser = async (userData) => {
    try {
        console.log("Creating user with data:", userData);
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        throw new Error(error.message || "Failed to create user");
    }
};

const updateUser = async (userId, userData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, userData, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw new Error("Failed to update user");
    }
}

const deleteUser = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw new Error("Failed to delete user");
    }
};

const userControllers = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    checkUser

}


module.exports = { userControllers };