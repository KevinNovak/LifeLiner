const router = require('express').Router();
const organizationController = require('../controllers/organizationController');

router.get('/', organizationController.getOrganizations);
router.get('/:id', organizationController.getOrganizationById);

module.exports = router;
