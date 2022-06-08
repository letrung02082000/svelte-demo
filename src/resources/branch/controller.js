const service = require('./service');
const { BaseController } = require('../_commons');
const { uploadToImgur } = require('../../helpers');

class Controller extends BaseController {
  constructor(service) {
    super(service);
  }

  add = async (req, res) => {
    try {
      const files = req.files;
      let images = [];

      if (files && files.images) {
        for (let file of files.images) {
          const response = await uploadToImgur(file.path);

          if (response && response[0].data) {
            images.push(response[0].data.link);
          }
        }
      }

      req.body.images = images;

      const data = await this.service.create(req.body);

      return res.status(200).json({ message: 'success', data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.toString() });
    }
  };
}

module.exports = new Controller(service);
