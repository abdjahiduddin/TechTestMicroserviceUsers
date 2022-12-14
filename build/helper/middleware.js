"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// eslint-disable-next-line no-unused-vars
var handleError = function handleError(err, req, res, next) {
  console.log("Custom Error Handler");
  var code = err.statusCode || 500;
  var response = {
    message: err.message
  };
  if (err.data !== undefined) response.data = err.data;
  res.status(code).json(response);
};
var cors = function cors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};
var debug = function debug(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.hostname);
  next();
};
var _default = {
  handleError: handleError,
  cors: cors,
  debug: debug
};
exports["default"] = _default;
//# sourceMappingURL=middleware.js.map