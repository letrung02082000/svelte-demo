const express = require('express');
const router = express.Router();
const controller = require('./controller');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      let ext = file.originalname.split('.');
      ext = ext[ext.length - 1];

      cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
  },
});

var upload = multer({ storage });

router.post(
  '/',
  upload.fields([{ name: 'images', maxCount: 5 }]),
  controller.add,
);
router.get('/', controller.searchWithPaging);
router.get('/:id', controller.getById);
router.patch(
  '/:id',
  upload.fields([{ name: 'images', maxCount: 5 }]),
  controller.update,
);

module.exports = router;
