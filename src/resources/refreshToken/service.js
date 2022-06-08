const model = require('../../models/photocopyTag.model');
const mongoose = require('mongoose');
const BaseService = require('../commons/base.service');

class Service extends BaseService {
  constructor(props) {
    super(props);
  }
}

module.exports = new Service(model);
