const mongoose = require('mongoose');

module.exports = {
  connectDatabase(mongoUrl) {
    mongoose
      .connect(mongoUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(
        () => console.log("Connected to database!"),
        (err) => console.log(err)
      )
      .catch((error) => console.log(error));
  },
};
