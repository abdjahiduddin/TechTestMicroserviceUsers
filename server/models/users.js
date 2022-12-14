import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
        type: String,
        enum: ["admin", "user"],
        required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
