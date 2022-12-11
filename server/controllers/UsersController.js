import Users from "../models/users";
import bcrypt from "bcryptjs";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find({}, { password: 0 });
    res.status(200).json({
      message: "Successfully fetched all users",
      users: users,
      totalItems: users.length,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const getOneUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await Users.findById(userId, { password: 0 });

    if (!user) {
      const error = new Error("Could not find user");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "User found",
      user: user,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const email = req.body.email;
  const fullname = req.body.fullname;
  const username = req.body.username;
  const password = req.body.password;
  const type = req.body.type;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new Users({
      email: email,
      fullname: fullname,
      username: username,
      password: hashPassword,
      type: type,
    });

    const result = await user.save();

    res.status(200).json({
      message: "Successfully created user",
      userId: result._id.toString(),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await Users.findById(userId, { password: 0 });

    if (!user) {
      const error = new Error("Could not find user");
      error.statusCode = 404;
      throw error;
    }

    user.email = req.body.email;
    user.fullname = req.body.fullname;
    user.username = req.body.username;

    const result = await user.save();

    res.status(200).json({
      message: "User updated",
      user: result,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const user = await Users.findById(userId);

    if (!user) {
      const error = new Error("Could not find user");
      error.statusCode = 404;
      throw error;
    }

    const isEqual = await bcrypt.compare(oldPassword, user.password);

    if (!isEqual) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const newHashPassword = await bcrypt.hash(newPassword, 12);

    user.password = newHashPassword;
    await user.save();

    res.status(200).json({
      message: "Successfully updated password",
      userId: userId,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const updateUserType = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const type = req.body.type;
    const user = await Users.findById(userId, { type: 1 });

    if (!user) {
      const error = new Error("Could not find user");
      error.statusCode = 404;
      throw error;
    }

    user.type = type;
    await user.save();

    res.status(200).json({
      message: "Successfully change user type",
      userId: userId,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await Users.findById(userId, { password: 0 });

    if (!user) {
      const error = new Error("Could not find user");
      error.statusCode = 404;
      throw error;
    }

    await Users.deleteOne({ _id: userId });

    res.status(200).json({
      message: "Successfully delete user",
      userId: userId,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default {
  getAllUsers,
  getOneUser,
  createUser,
  updateUserProfile,
  updateUserPassword,
  updateUserType,
  deleteUser,
};
