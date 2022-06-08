const service = require('./service');
const { BaseController } = require('../_commons');
const gDrive = require('../../helpers/googleDrive.helper');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const orderid = require('order-id')('photocopy-order-123');

class Controller extends BaseController {
  constructor(service) {
    super(service);
  }

  query = async (req, res) => {
    try {
      const { tel } = req.query;
      const data = await this.service.findMany({ tel });
      return res.status(200).json({
        message: 'success',
        data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  };

  add = async (req, res) => {
    try {
      console.log(req.body);
      const { drive } = req.body;
      const files = req.files;
      let receiptId = null;

      if (files && files.receipt) {
        const file = files.receipt[0];
        receiptId = await gDrive.upload(
          file.filename,
          file.filename,
          file.mimeType,
          drive,
          'documents',
        );

        if (!receiptId) {
          return res.status(500).json({
            message: 'Không thể tải lên hóa đơn',
          });
        }

        fs.unlinkSync(path.join('documents', file.filename));
      }

      const orderCode = orderid.generate();
      req.body.receiptId = receiptId;
      req.body.orderCode = orderCode;

      const data = await this.service.create(req.body);

      // await this.sendEmail(data);

      return res.status(200).json({
        message: 'success',
        data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  };

  upload = async (req, res) => {
    try {
      const DRIVE_ID = '1MCa1awDb8iQcw-xsFt_sMjRrc-M8lFv1';
      const files = req.files;
      let documentId = null;

      if (files && files.document) {
        const file = files.document[0];
        documentId = await gDrive.upload(
          files.document[0].filename,
          files.document[0].filename,
          files.document[0].mimeType,
          DRIVE_ID,
          'documents',
        );

        if (!documentId) {
          return res.status(500).json({
            message: 'cannot upload document',
          });
        }

        fs.unlinkSync(path.join('documents', file.filename));
      } else {
        return res.status(400).json({
          message: 'no document',
        });
      }

      return res.status(200).json({ message: 'sucess', data: { documentId } });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.toString() });
    }
  };

  sendEmail = async (data) => {
    // notify by sending email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'hotro.isinhvien@gmail.com',
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mainOptions = {
      from: 'Hỗ trợ iSinhvien',
      to: ['letrung02082000@gmail.com'],
      subject: `Khách hàng ${data.name} đã gửi tài liệu in ấn`,
      text: 'Bạn nhận đơn hàng in ấn từ hệ thống iSinhvien',
      html:
        '<ul><li>Mã đơn hàng: ' +
          data.orderCode +
          '</li><li>Họ tên:' +
          data.name +
          '</li><li>Số điện thoại: ' +
          data.tel +
          '</li><li>Zalo: ' +
          data.zalo +
          '</li><li>Link tài liệu: ' +
          (data.documentLink || 'Không có') +
          '</li><li>Địa chỉ: ' +
          data.address ||
        'Không có' +
          '</li><li>Link Hóa đơn: ' +
          (data.receiptId &&
            `https://drive.google.com/file/d/${data.receiptId}`) +
          '</li><li>Yêu cầu in: ' +
          data.note,
    };

    await transporter.sendMail(mainOptions);
  };
}

module.exports = new Controller(service);
