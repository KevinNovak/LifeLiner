const router = require('express').Router();
const locationController = require('../controllers/locationController');

router.get('/', locationController.getLocations);

module.exports = router;
