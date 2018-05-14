const router = require('express').Router();
const audienceController = require('../controllers/audienceController');

router.get('/', audienceController.getAudiences);
router.get('/:id', audienceController.getAudience);

router.post('/', audienceController.addAudience);

module.exports = router;
