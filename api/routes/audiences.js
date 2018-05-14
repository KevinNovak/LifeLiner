const router = require('express').Router();
const audienceController = require('../controllers/audienceController');

router.get('/', audienceController.getAudiences);
router.get('/:id', audienceController.getAudience);

module.exports = router;
