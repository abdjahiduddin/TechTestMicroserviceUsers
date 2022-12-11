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

export default {
  getAllUsers,
  createUser,
};
