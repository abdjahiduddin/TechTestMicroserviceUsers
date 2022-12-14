"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _expressValidator = require("express-validator");
var result = function result(req, res, next) {
  var error = (0, _expressValidator.validationResult)(req);
  if (!error.isEmpty()) {
    var err = new Error("Validation failed");
    err.statusCode = 422;
    err.data = error.array();
    next(err);
  }
  next();
};
var _default = {
  result: result
};
exports["default"] = _default;
//# sourceMappingURL=validation.js.map