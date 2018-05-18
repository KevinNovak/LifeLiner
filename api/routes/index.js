const router = require('express').Router();
const organizations = require('./organizations');
const audiences = require('./audiences');
const locations = require('./locations');

router.use('/organizations', organizations);
router.use('/audiences', audiences);
router.use('/locations', locations);

module.exports = router;
