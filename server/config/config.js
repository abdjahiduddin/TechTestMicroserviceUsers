import dotenv from "dotenv";

dotenv.config();

const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1"
const port = process.env.NODE_ENV === "production" ? 8080 : 8081

const config = {
  env: process.env.NODE_ENV || "development",
  host: host,
  port: port,
  mongodb_uri: process.env.MONGODB_URI,
  jwt_secret: process.env.JWT_SECRET
};

export default config;
