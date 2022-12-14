"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _config = _interopRequireDefault(require("../config/config"));
var testApi = function testApi(req, res) {
  res.status(200).json({
    status: _config["default"].env
  });
};
var _default = {
  testApi: testApi
};
exports["default"] = _default;
//# sourceMappingURL=TestControllers.js.map