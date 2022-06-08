const { BaseController } = require('../_commons');
const service = require('./service');
const validator = require('email-validator');

class Controller extends BaseController {
  register = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: 'Nhập đầy đủ email và password' });
      }

      if (await service.isEmailExisted(email)) {
        return res.status(400).json({ message: 'Địa chỉ email đã tồn tại' });
      }

      const isValidEmail = validator.validate(email);

      if (!isValidEmail) {
        return res.status(400).json({ message: 'Địa chỉ email không hợp lệ' });
      }

      if (password.trim().length < 8) {
        return res
          .status(400)
          .json({ message: 'Mật khẩu có độ dài tối thiểu 8 ký tự' });
      }

      const data = await service.register(email, password);
      res.status(200).json({ message: 'success', ...data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!(await service.isEmailExisted(email))) {
        return res.status(400).json({
          message: 'Địa chỉ email chưa được đăng ký',
        });
      }
      const data = await service.login(email, password);

      if (data) {
        return res.status(200).json({
          message: 'success',
          ...data,
        });
      } else {
        return res.status(400).json({
          message: 'Sai mật khẩu',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  };

  getUser = async (req, res) => {
    try {
      const user = await service.findById(req.userId);
      user.password = '*';

      return res.status(200).json({
        message: 'success',
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  };

  changePassword = async (req, res) => {
    try {
      const { password, newPassword } = req.body;

      if (!password) {
        return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
      }

      if (!newPassword || newPassword.trim().length < 8) {
        return res
          .status(400)
          .json({ message: 'Mật khẩu mới có độ dài tối thiểu 8 ký tự' });
      }

      const isChanged = await service.updatePassword(
        req.userId,
        password,
        newPassword
      );

      if (isChanged) {
        return res.status(200).json({
          message: 'success',
        });
      } else {
        return res.status(400).json({
          message: 'Sai mật khẩu',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  };
}

module.exports = new Controller(service);
