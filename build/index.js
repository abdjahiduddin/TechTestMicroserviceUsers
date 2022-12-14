"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _compression = _interopRequireDefault(require("compression"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _helmet = _interopRequireDefault(require("helmet"));
var _config = _interopRequireDefault(require("./config/config"));
var _middleware = _interopRequireDefault(require("./helper/middleware"));
var _IndexRoutes = _interopRequireDefault(require("./routes/IndexRoutes"));
_dotenv["default"].config();
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use((0, _helmet["default"])());
app.use((0, _compression["default"])());
app.use(_middleware["default"].cors);
app.use(_middleware["default"].debug);
app.use("/api", _IndexRoutes["default"].UsersRoutes);
app.use("/test", _IndexRoutes["default"].TestRoutes);
app.use(_middleware["default"].handleError);
_mongoose["default"].connect(_config["default"].mongodb_uri).then(function () {
  console.log("Successfully connect to database");
  app.listen(_config["default"].port, _config["default"].host, function () {
    console.log("Server is listening on ".concat(_config["default"].host, ":").concat(_config["default"].port));
  });
})["catch"](function (error) {
  return console.log(error);
});
//# sourceMappingURL=index.js.map