const express = require('express');
const router = express.Router();
const { bookClass, createClass, cancelClass } = require('../controllers/class');

router.post('/new', createClass);
router.post('/book/:classId', bookClass);
router.post('/cancel/:classId', cancelClass);

module.exports = router;
