const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { BaseService } = require('../_commons');
const UserModel = require('./model');

class Service extends BaseService {
  generateToken = (id) => {
    const { ACCESS_TOKEN_SECRET } = process.env;

    const token = jwt.sign(
      {
        id: id.toString(),
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    return token;
  };

  generateRefreshToken = (id, token) => {
    const { REFRESH_TOKEN_SECRET } = process.env;

    const refreshToken = jwt.sign(
      {
        id: id.toString(),
        token,
      },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '30d' }
    );
    return refreshToken;
  };

  register = async (email, password) => {
    const salt = bcrypt.genSaltSync(8);
    const passwordHash = bcrypt.hashSync(password, salt);

    const user = new UserModel({ email, password: passwordHash });
    const data = await user.save();
    const token = this.generateToken(data._id);
    const refreshToken = this.generateRefreshToken(data._id, token);

    return { token, refreshToken };
  };

  isEmailExisted = async (email) => {
    const user = await UserModel.findOne({ email });
    if (user) return true;

    return false;
  };

  async login(email, password) {
    try {
      const user = await UserModel.findOne({ email });

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        const token = this.generateToken(user._id);
        const refreshToken = this.generateRefreshToken(user._id, token);

        return { token, refreshToken };
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  updatePassword = async (id, password, newPassword) => {
    const user = await UserModel.findById(id);
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      const salt = bcrypt.genSaltSync(8);
      const passwordHash = bcrypt.hashSync(newPassword, salt);
      const data = await UserModel.findByIdAndUpdate(id, {
        $set: { password: passwordHash },
      });
      return true;
    } else {
      return false;
    }
  };
}

module.exports = new Service(UserModel);
