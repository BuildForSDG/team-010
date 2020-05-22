"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../controllers/auth.controller"));

var _body = _interopRequireDefault(require("../middlewares/validation/body.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/verification/:token', _auth.default.isVerified).post('/signup', [_body.default], _auth.default.signup);
var _default = router;
exports.default = _default;
//# sourceMappingURL=user.route.js.map