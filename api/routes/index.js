const router = require('express').Router();
const organizations = require('./organizations');
const audiences = require('./audiences');

router.use('/organizations', organizations);
router.use('/audiences', audiences);

module.exports = router;
