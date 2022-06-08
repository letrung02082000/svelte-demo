const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  let token = req.headers['token'];
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    } else {
      req.userId = decoded.id;
      next();
    }
  });
}

module.exports = {
  verifyToken,
};
