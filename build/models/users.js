"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _mongoose = _interopRequireDefault(require("mongoose"));
var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    "enum": ["admin", "user"],
    required: true
  }
}, {
  timestamps: true
});
module.exports = _mongoose["default"].model("User", userSchema);
//# sourceMappingURL=users.js.map