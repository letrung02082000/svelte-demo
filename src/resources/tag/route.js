const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/', controller.add);
router.get('/', controller.searchWithPaging);
router.get('/search', controller.searchWithPaging);
router.get('/:id', controller.getById);
router.patch('/:id', controller.update);

module.exports = router;
