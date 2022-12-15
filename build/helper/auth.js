"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../config/config"));
var _users = _interopRequireDefault(require("../models/users"));
var isAuth = function isAuth(req, res, next) {
  var authHeader = req.get("Authorization");
  if (!authHeader) {
    errorHandling("Not authorized, Authorization header not found", 401);
  }
  try {
    var token = authHeader.split(" ")[1];
    var decodedToken = _jsonwebtoken["default"].verify(token, _config["default"].jwt_secret);
    if (!decodedToken) {
      errorHandling("Token verification failed", 401);
    }
    req.userData = {
      userId: decodedToken.userId,
      email: decodedToken.email
    };
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 401;
    }
    next(error);
  }
};
var isAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var userId, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userId = req.userData.userId;
            _context.next = 4;
            return _users["default"].findById(userId, {
              password: 0
            });
          case 4:
            user = _context.sent;
            if (!user) {
              errorHandling("Authentication failed, Could not find user", 401);
            }
            if (!(user.type === "admin")) {
              errorHandling("Authorization failed, Not admin", 401);
            }
            next();
            _context.next = 14;
            break;
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            if (!_context.t0.statusCode) {
              _context.t0.statusCode = 401;
            }
            next(_context.t0);
          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function isAdmin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var isUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var userId, paramUserId, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            userId = req.userData.userId;
            paramUserId = req.params.userId;
            _context2.next = 5;
            return _users["default"].findById(userId, {
              password: 0
            });
          case 5:
            user = _context2.sent;
            if (!user) {
              errorHandling("Authentication failed, Could not find user", 401);
            }
            if (userId !== paramUserId && user.type !== "admin") {
              errorHandling("Authorization failed, Cannot access another user's data", 401);
            }
            next();
            _context2.next = 15;
            break;
          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            if (!_context2.t0.statusCode) {
              _context2.t0.statusCode = 401;
            }
            next(_context2.t0);
          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function isUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var errorHandling = function errorHandling(message, code) {
  var error = new Error(message);
  error.statusCode = code;
  throw error;
};
var _default = {
  isAuth: isAuth,
  isAdmin: isAdmin,
  isUser: isUser
};
exports["default"] = _default;
//# sourceMappingURL=auth.js.map