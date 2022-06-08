const service = require('./service');
const { BaseController } = require('../_commons');

class Controller extends BaseController {
  constructor(service) {
    super(service);
  }
}

module.exports = new Controller(service);
