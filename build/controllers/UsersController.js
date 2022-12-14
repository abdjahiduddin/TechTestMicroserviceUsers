"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _users = _interopRequireDefault(require("../models/users"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var users;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _users["default"].find({}, {
              password: 0
            });
          case 3:
            users = _context.sent;
            res.status(200).json({
              message: "Successfully fetched all users",
              users: users,
              totalItems: users.length
            });
            _context.next = 11;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            if (!_context.t0.statusCode) {
              _context.t0.statusCode = 500;
            }
            next(_context.t0);
          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function getAllUsers(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getOneUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var userId, user, error;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            userId = req.params.userId;
            _context2.next = 4;
            return _users["default"].findById(userId, {
              password: 0
            });
          case 4:
            user = _context2.sent;
            if (user) {
              _context2.next = 9;
              break;
            }
            error = new Error("Could not find user");
            error.statusCode = 404;
            throw error;
          case 9:
            res.status(200).json({
              message: "User found",
              user: user
            });
            _context2.next = 16;
            break;
          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            if (!_context2.t0.statusCode) {
              _context2.t0.statusCode = 500;
            }
            next(_context2.t0);
          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function getOneUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var createUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var email, fullname, username, password, type, hashPassword, user, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            email = req.body.email;
            fullname = req.body.fullname;
            username = req.body.username;
            password = req.body.password;
            type = req.body.type;
            _context3.prev = 5;
            _context3.next = 8;
            return _bcryptjs["default"].hash(password, 12);
          case 8:
            hashPassword = _context3.sent;
            user = new _users["default"]({
              email: email,
              fullname: fullname,
              username: username,
              password: hashPassword,
              type: type
            });
            _context3.next = 12;
            return user.save();
          case 12:
            result = _context3.sent;
            res.status(200).json({
              message: "Successfully created user",
              userId: result._id.toString()
            });
            _context3.next = 20;
            break;
          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](5);
            if (!_context3.t0.statusCode) {
              _context3.t0.statusCode = 500;
            }
            next(_context3.t0);
          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 16]]);
  }));
  return function createUser(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var updateUserProfile = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var userId, user, error, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            userId = req.params.userId;
            _context4.next = 4;
            return _users["default"].findById(userId, {
              password: 0
            });
          case 4:
            user = _context4.sent;
            if (user) {
              _context4.next = 9;
              break;
            }
            error = new Error("Could not find user");
            error.statusCode = 404;
            throw error;
          case 9:
            user.email = req.body.email;
            user.fullname = req.body.fullname;
            user.username = req.body.username;
            _context4.next = 14;
            return user.save();
          case 14:
            result = _context4.sent;
            res.status(200).json({
              message: "User updated",
              user: result
            });
            _context4.next = 22;
            break;
          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](0);
            if (!_context4.t0.statusCode) {
              _context4.t0.statusCode = 500;
            }
            next(_context4.t0);
          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 18]]);
  }));
  return function updateUserProfile(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var updateUserPassword = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var userId, oldPassword, newPassword, user, error, isEqual, _error, newHashPassword;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            userId = req.params.userId;
            oldPassword = req.body.oldPassword;
            newPassword = req.body.newPassword;
            _context5.next = 6;
            return _users["default"].findById(userId);
          case 6:
            user = _context5.sent;
            if (user) {
              _context5.next = 11;
              break;
            }
            error = new Error("Could not find user");
            error.statusCode = 404;
            throw error;
          case 11:
            _context5.next = 13;
            return _bcryptjs["default"].compare(oldPassword, user.password);
          case 13:
            isEqual = _context5.sent;
            if (isEqual) {
              _context5.next = 18;
              break;
            }
            _error = new Error("Invalid password");
            _error.statusCode = 401;
            throw _error;
          case 18:
            _context5.next = 20;
            return _bcryptjs["default"].hash(newPassword, 12);
          case 20:
            newHashPassword = _context5.sent;
            user.password = newHashPassword;
            _context5.next = 24;
            return user.save();
          case 24:
            res.status(200).json({
              message: "Successfully updated password",
              userId: userId
            });
            _context5.next = 31;
            break;
          case 27:
            _context5.prev = 27;
            _context5.t0 = _context5["catch"](0);
            if (!_context5.t0.statusCode) {
              _context5.t0.statusCode = 500;
            }
            next(_context5.t0);
          case 31:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 27]]);
  }));
  return function updateUserPassword(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var updateUserType = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var userId, type, user, error;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            userId = req.params.userId;
            type = req.body.type;
            _context6.next = 5;
            return _users["default"].findById(userId, {
              type: 1
            });
          case 5:
            user = _context6.sent;
            if (user) {
              _context6.next = 10;
              break;
            }
            error = new Error("Could not find user");
            error.statusCode = 404;
            throw error;
          case 10:
            user.type = type;
            _context6.next = 13;
            return user.save();
          case 13:
            res.status(200).json({
              message: "Successfully change user type",
              userId: userId
            });
            _context6.next = 20;
            break;
          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](0);
            if (!_context6.t0.statusCode) {
              _context6.t0.statusCode = 500;
            }
            next(_context6.t0);
          case 20:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 16]]);
  }));
  return function updateUserType(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var deleteUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var userId, user, error;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            userId = req.params.userId;
            _context7.next = 4;
            return _users["default"].findById(userId, {
              password: 0
            });
          case 4:
            user = _context7.sent;
            if (user) {
              _context7.next = 9;
              break;
            }
            error = new Error("Could not find user");
            error.statusCode = 404;
            throw error;
          case 9:
            _context7.next = 11;
            return _users["default"].deleteOne({
              _id: userId
            });
          case 11:
            res.status(200).json({
              message: "Successfully delete user",
              userId: userId
            });
            _context7.next = 18;
            break;
          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](0);
            if (!_context7.t0.statusCode) {
              _context7.t0.statusCode = 500;
            }
            next(_context7.t0);
          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 14]]);
  }));
  return function deleteUser(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var _default = {
  getAllUsers: getAllUsers,
  getOneUser: getOneUser,
  createUser: createUser,
  updateUserProfile: updateUserProfile,
  updateUserPassword: updateUserPassword,
  updateUserType: updateUserType,
  deleteUser: deleteUser
};
exports["default"] = _default;
//# sourceMappingURL=UsersController.js.map