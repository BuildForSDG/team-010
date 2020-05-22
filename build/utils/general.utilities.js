"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const General = {
  /**
   * @description - validate password by comparing password with hash password
   * @param {string} password
   * @param {string} hashpassword
   * @returns {boolean} boolean to show if password match or not
   */
  compare(password, userPassword) {
    return _bcrypt.default.compareSync(password, userPassword);
  },

  /**
   * @description - encypt password
   * @param { String} password
   * @returns {String} hashpassword
   */
  async hash(password) {
    // const salt = bcrypt.genSaltSync(12);
    return _bcrypt.default.hashSync(password, 12);
  },

  /**
   * @description - encypt password
   * @param { String} password
   * @returns {String} hashpassword
   */
  signToken(id) {
    return _jsonwebtoken.default.sign({
      id
    }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  },

  /**
   * @description - remove null key from  object
   * @param {object}
   * @returns {object}
   */
  stripNull(obj) {
    let cleanObj = {};
    Object.keys(obj).forEach(val => {
      const newVal = obj[val];
      cleanObj = newVal ? { ...cleanObj,
        [val]: newVal
      } : cleanObj;
    });
    return cleanObj;
  }

};
var _default = General;
exports.default = _default;
//# sourceMappingURL=general.utilities.js.map