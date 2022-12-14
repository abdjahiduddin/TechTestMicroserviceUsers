"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _IndexControllers = _interopRequireDefault(require("../controllers/IndexControllers"));
var router = (0, _express.Router)();
router.get("/", _IndexControllers["default"].TestControllers.testApi);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=TestRoutes.js.map