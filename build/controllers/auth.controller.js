"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../models/index"));

var _response = _interopRequireDefault(require("../utils/response.utilities"));

var _general = _interopRequireDefault(require("../utils/general.utilities"));

var _auth = _interopRequireDefault(require("../middlewares/auth.middleware"));

var _email = _interopRequireDefault(require("../services/email.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const response = new _response.default();

class AuthController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof UserController
   */
  static async signup(req, res) {
    try {
      const {
        email
      } = req.body;
      const foundUser = await _index.default.User.findOne({
        where: {
          email
        }
      });

      if (foundUser) {
        res.status(400).json({
          status: 'error',
          message: 'Email is already in use'
        });
      }

      req.body.password = await _general.default.hash(req.body.password);
      const newUser = await _index.default.User.create(req.body);
      const result = newUser.toJSON();

      const token = _auth.default.signJwt(result);

      delete result.password;

      if (result.email) {
        // 3) Send verification link  to user's email
        const verificationURL = `${req.protocol}://${req.get('host')}/api/v1/auth/verification/${token}`;
        const message = ` Click on this link to verify your account: ${verificationURL}`;
        await (0, _email.default)({
          email: result.email,
          subject: 'Your link only (valid for some mins)',
          message
        });
        return response.sendSuccess(res, 201, {
          token,
          ...result
        });
      }

      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
  /** verify User by email
   * @description Operate on a user and his account
   * @param {object} user object is updated
   */


  static async isVerified(req, res) {
    try {
      const {
        token
      } = req.params;
      const decoded = await _auth.default.decodeJwt(token);
      await _index.default.User.update({
        isVerified: true
      }, {
        where: {
          id: decoded.id
        }
      });
      return res.status(200).json({
        status: 'success',
        message: 'your account has been verified, Welcome'
      });
    } catch (error) {
      return response.sendError(res, 500, 'Your token is wrong or has expired try again later!');
    }
  }

}

var _default = AuthController;
exports.default = _default;
//# sourceMappingURL=auth.controller.js.map