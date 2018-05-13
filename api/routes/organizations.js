const router = require('express').Router();
const organizationController = require('../controllers/organizationController');

// Organizations
router.get('/', organizationController.getOrganizations);
router.get('/:id', organizationController.getOrganization);

router.post('/', organizationController.addOrganization);

router.put('/:id', organizationController.updateOrganization);

router.delete('/:id', organizationController.removeOrganization);

module.exports = router;
