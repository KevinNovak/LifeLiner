const router = require('express').Router();
const audienceController = require('../controllers/audienceController');

router.get('/', audienceController.getAudiences);

module.exports = router;
