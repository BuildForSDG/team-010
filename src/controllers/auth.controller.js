import ResponseGenerator from '../utils/response.utilities';
import UserService from '../services/user.service';
import sendEmail from '../utils/email.utilities';


const response = new ResponseGenerator();

class AuthController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof UserController
   */

  static async signup(req, res) {
    try {
      const user = await UserService.addUser(req);
      if (user) {
        // 3) Send verification link  to user's email
        const verificationURL = `${req.protocol}://${req.get(
          'host'
        )}/api/v1/auth/verification/${user.token}`;

        const message = ` Click on this link to verify your account: ${verificationURL}`;
        await sendEmail({
          email: user.email,
          subject: 'Your link only (valid for some mins)',
          message
        });
        return response.sendSuccess(
          res,
          201,
          user
        );
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof UserController
   */

  static async isVerified(req, res) {
    try {
      const verified = await UserService.isVerified(req);
      if (verified) {
        return res.status(200).json({
          status: 'success',
          message: 'your account has been verified, Welcome'
        });
      }
      return response.sendError(res, 500, 'Your token is wrong or has expired try again later!');
    } catch (error) {
      return response.sendError(res, 500, error.message);
    }
  }
}


export default AuthController;
