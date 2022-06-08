const service = require('./service');
const BaseController = require('../../controllers/base.controller');

class CategoryController extends BaseController {
  constructor(service) {
    super(service);
  }
}

module.exports = new CategoryController(service);
