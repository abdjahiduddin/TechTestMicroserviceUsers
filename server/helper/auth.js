import jwt from "jsonwebtoken";
import config from "../config/config";
import Users from "../models/users"

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    errorHandling("Not authorized, Authorization header not found", 401);
  }

  try {
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, config.jwt_secret);
    if (!decodedToken) {
      errorHandling("Token verification failed", 401);
    }
    req.userData = {
      userId: decodedToken.userId,
      email: decodedToken.email,
    };
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.userData.userId
    const user = await Users.findById(userId, { password: 0 });

    if (!user) {
      errorHandling("Authentication failed, Could not find user", 401)
    }

    if (!(user.type === "admin")) {
      errorHandling("Authorization failed, Not admin", 401)
    }

    next()
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const errorHandling = (message, code) => {
  const error = new Error(message);
  error.statusCode = code;
  throw error;
};

export default {
  isAuth,
  isAdmin,
};
