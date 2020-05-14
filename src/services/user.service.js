// /* eslint-disable no-useless-catch */
import database from '../models/index';
import GeneralUtils from '../utils/general.utilities';
import Auth from '../middlewares/auth.middleware';

class Userservice {
  /** Add user to the database
   * @description Operate on a user and his account
   * @param {object} a new user object
   */

  static async addUser({ body }, res) {
    try {
      const foundUser = await database.User.findOne({
        where: { email: body.email }
      });

      if (foundUser) {
        res.status(400).json({
          status: 'rrorr',
          message: 'Email is already in use'
        });
      }
      const { password, confirmPassword, ...otherProps } = body;
      const hashedpassword = await GeneralUtils.hash(body.password);

      const newUser = await database.User.create({
        password: hashedpassword,
        ...otherProps

      });
      const token = Auth.signJwt(newUser);
      return {
        token,
        ...otherProps
      };
    } catch (error) {
      return error;
    }
  }

  /** verify User by email
   * @description Operate on a user and his account
   * @param {object} user object is updated
   */
  static async isVerified({ params }) {
    try {
      const { token } = params;
      const decoded = Auth.decodeJwt(token);
      if (decoded) {
        const updatedUser = await database.User.update(
          { isVerified: true },
          { where: { id: decoded.id } }
        );
        return updatedUser;
      }
      return null;
    } catch (error) {
      return error;
    }
  }
}


export default Userservice;
