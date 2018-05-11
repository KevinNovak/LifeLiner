const router = require('express').Router();
const organizations = require('./organizations');

router.use('/organizations', organizations);

module.exports = router;
