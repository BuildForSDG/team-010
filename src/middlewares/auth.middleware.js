import moment from 'moment';
import jwt from 'jsonwebtoken';
import ResponseGenerator from '../utils/response.utilities';
import keys from '../utils/config.utilities';

const response = new ResponseGenerator();

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
        return next(
          res.status(403).json({
            status: 'error',
            message: 'You do not have permission to perform this action'
          })
        );
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
      iat: moment().unix(),
      exp: moment()
        .add(1, 'days')
        .unix()
    };
    return jwt.sign(payload, keys.secret);
  }

  static decodeJwt(token) {
    let payload = null;
    payload = jwt.decode(token, keys.secret);
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

    if (payload.exp <= moment().unix()) {
      result.status = 401;
      result.message = 'Token has expired';
      return result;
    }
    return payload;
  }
}
export default Authentication;
