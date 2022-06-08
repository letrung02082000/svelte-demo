const express = require('express');
const router = express.Router();
const controller = require('./controller');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'documents');
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split('.');
    ext = ext[ext.length - 1];

    cb(null, Date.now() + '.' + ext);
  },
});

var upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const fileSize = parseInt(req.headers['content-length']);
    console.log(req.headers['content-length']);
    if (fileSize <= 27825792) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

router.post(
  '/',
  upload.fields([{ name: 'receipt', maxCount: 1 }]),
  controller.add,
);
router.post(
  '/upload',
  upload.fields([{ name: 'document', maxCount: 1 }]),
  controller.upload,
);
router.patch('/:id', controller.update);
router.get('/:id', controller.getById);
router.get('/', controller.searchWithPaging);
module.exports = router;
