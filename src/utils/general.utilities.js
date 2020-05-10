import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const General = {
  /**
   * @description - validate password by comparing password with hash password
   * @param {string} password
   * @param {string} hashpassword
   * @returns {boolean} boolean to show if password match or not
   */
  compare(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  },

  /**
   * @description - encypt password
   * @param { String} password
   * @returns {String} hashpassword
   */
  async hash(password) {
    // const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, 12);
  },

  /**
   * @description - encypt password
   * @param { String} password
   * @returns {String} hashpassword
   */
  signToken(id) {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
  },
  /**
   * @description - remove null key from  object
   * @param {object}
   * @returns {object}
   */
  stripNull(obj) {
    let cleanObj = {};

    Object.keys(obj).forEach((val) => {
      const newVal = obj[val];
      cleanObj = newVal ? { ...cleanObj, [val]: newVal } : cleanObj;
    });

    return cleanObj;
  }

};

export default General;
