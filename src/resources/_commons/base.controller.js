class Controller {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res) => {
    try {
      const data = await this.service.findAll();

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

  getVisibleWithPaging = async (req, res) => {
    try {
      const { page, limit } = req.query;
      const data = await this.service.findWithPaging(page, limit, {
        isVisible: true,
      });

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

  // getAllWithPaging = async (req, res) => {
  //   try {
  //     const { page, limit } = req.query;
  //     const data = await this.service.findWithPaging(page, limit);

  //     return res.status(200).json({
  //       message: 'success',
  //       data,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({
  //       message: error.toString(),
  //     });
  //   }
  // };

  searchWithPaging = async (req, res) => {
    try {
      let { page, limit, search } = req.query;
      console.log(req.query);

      if (search) {
        search = JSON.parse(search);
      }

      const data = await this.service.findWithPaging(page, limit, search);

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

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await this.service.findById(id.toString());

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
      const data = await this.service.create(req.body);

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

  update = async (req, res) => {
    try {
      const id = req.params;
      const info = req.body;
      const data = await this.service.update(id, info);

      return res.status(200).json({ message: 'success', data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  };

  remove = async (req, res) => {
    try {
      const id = req.params;
      const data = await this.service.delete(id);

      return res.status(200).json({ message: 'success', data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.toString(),
      });
    }
  };
}

module.exports = Controller;
