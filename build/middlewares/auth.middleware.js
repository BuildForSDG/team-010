"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _response = _interopRequireDefault(require("../utils/response.utilities"));

var _config = _interopRequireDefault(require("../utils/config.utilities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const response = new _response.default();

class Authentication {
  /**
   * @description - use for decoding authorization token
   *
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   *
   * @returns {Object} Object
   */
  static async authenticate(req, res, next) {
    const payload = await Authentication.consumeToken(req);

    if (payload.status && payload.status !== 200) {
      return response.sendError(res, payload.status, payload.message);
    }

    req.user = payload;
    return next();
  }

  static restrictTo(...roles) {
    return (req, res, next) => {
      // roles ['admin', 'lead-guide'].
      if (!roles.includes(req.body.role)) {
        return next(res.status(403).json({
          status: 'error',
          message: 'You do not have permission to perform this action'
        }));
      }

      return next();
    };
  }
  /** Create a JWT
   * @param user
   */


  static signJwt(user) {
    const payload = {
      id: user.id,
      role: user.role,
      iat: (0, _moment.default)().unix(),
      exp: (0, _moment.default)().add(1, 'days').unix()
    };
    return _jsonwebtoken.default.sign(payload, _config.default.secret);
  }

  static decodeJwt(token) {
    let payload = null;
    payload = _jsonwebtoken.default.decode(token, _config.default.secret);
    return payload;
  }

  static bearer(token) {
    const payload = this.decodeJwt(token);
    return payload;
  }

  static async consumeToken(req) {
    const result = {};

    if (!req.headers.authorization) {
      result.status = 401;
      result.message = 'Please make sure your request has an authorization header';
      return result;
    }

    const token = req.headers.authorization.split(' ')[1];
    const type = req.headers.authorization.split(' ')[0];
    let payload;

    switch (type) {
      case 'Bearer':
        payload = Authentication.bearer(token);
        break;

      default:
        result.status = 401;
        result.message = 'Invalid token type, Must be type Bearer';
        return result;
    }

    if (!payload) {
      result.status = 401;
      result.message = 'Authorization Denied.';
      return result;
    }

    if (payload.exp <= (0, _moment.default)().unix()) {
      result.status = 401;
      result.message = 'Token has expired';
      return result;
    }

    return payload;
  }

}

var _default = Authentication;
exports.default = _default;
//# sourceMappingURL=auth.middleware.js.map