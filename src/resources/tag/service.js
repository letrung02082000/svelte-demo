const model = require('./model');
const { BaseService } = require('../_commons');

class Service extends BaseService {
  constructor(model) {
    super(model);
  }
}

module.exports = new Service(model);
