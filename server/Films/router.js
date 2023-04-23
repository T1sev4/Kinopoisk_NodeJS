const express = require('express');
const router = express.Router();
const { upload } = require('./multer');
const { createFilm } = require('./controller');
const { isAuth } = require('../auth/middlewares');
router.post('/api/new', isAuth, upload.single('image'), createFilm);

module.exports = router;
