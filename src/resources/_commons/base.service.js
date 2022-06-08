const mongoose = require('mongoose');

class Service {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    return this.model.find({}).lean();
  }

  async findWithPaging(page, limit, query) {
    return this.model
      .find(query || {})
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit)
      .lean();
  }

  async findById(id) {
    return this.model.findById(id).lean();
  }

  async findOne(q) {
    return this.model.findOne(q).lean();
  }

  async findMany(q) {
    return this.model.find(q).lean();
  }

  async create(info) {
    const newDocument = new this.model(info);

    const retData = await newDocument.save();

    return retData;
  }

  async update(id, info) {
    const newDocument = await this.model.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: info,
      },
      { new: true }
    );

    return newDocument;
  }

  async delete(id) {
    const data = await this.model.findOneAndDelete({
      _id: mongoose.Types.ObjectId(id),
    });

    return data;
  }
}

module.exports = Service;
