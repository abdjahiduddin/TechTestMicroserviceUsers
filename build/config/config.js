"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();
var host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";
var port = process.env.NODE_ENV === "production" ? 8080 : 8081;
var config = {
  env: process.env.NODE_ENV || "development",
  host: host,
  port: port,
  mongodb_uri: process.env.MONGODB_URI,
  jwt_secret: process.env.JWT_SECRET
};
var _default = config;
exports["default"] = _default;
//# sourceMappingURL=config.js.map