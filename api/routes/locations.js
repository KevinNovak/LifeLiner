const router = require('express').Router();
const locationController = require('../controllers/locationController');

router.get('/', locationController.getLocations);
router.get('/:id', locationController.getLocation);

router.post('/', locationController.addLocation);

router.put('/:id', locationController.updateLocation);

router.delete('/:id', locationController.removeLocation);

module.exports = router;
