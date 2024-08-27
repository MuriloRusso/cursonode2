const express = require('express')
const router = express.Router();
const ToughtController = require('../controllers/ToughtController')

router.get('/', ToughtController.showToughts);
router.get('/dashboard', ToughtController.dashboard);
router.get('/new-tought', ToughtController.newTought);
router.post('/new-tought', ToughtController.newToughtPost);
router.get('/update-tought/:id', ToughtController.updateTought);
router.post('/update-tought', ToughtController.updateToughtPost);
router.get('/delete-tought/:id', ToughtController.deleteTought);
router.post('/delete-tought', ToughtController.deleteToughtPost);

module.exports = router;