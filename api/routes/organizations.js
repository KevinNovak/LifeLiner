const router = require('express').Router();
const organizationController = require('../controllers/organizationController');

// Organizations
router.get('/', organizationController.getOrganizations);
router.get('/:id', organizationController.getOrganizationById);

router.post('/', organizationController.addOrganization);

router.delete('/:id', organizationController.removeOrganization);

module.exports = router;
