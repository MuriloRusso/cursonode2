const express = require('express')
const router = express.Router();
const ToughtController = require('../controllers/ToughtController')

router.get('/', ToughtController.showToughts);
router.get('/dashboard', ToughtController.dashboard);
router.get('/new-tought', ToughtController.newTought);
router.post('/new-tought', ToughtController.newToughtPost);

module.exports = router;