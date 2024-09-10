const express = require('express')
const router = express.Router();
const ToughtController = require('../controllers/ToughtController')

const checkAuth = require('../helpers/auth').checkAuth; // função para verificação de autentificação

router.get('/', ToughtController.showToughts);
router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.get('/new-tought', checkAuth, ToughtController.newTought);
router.post('/new-tought', checkAuth, ToughtController.newToughtPost);
router.get('/update-tought/:id', checkAuth, ToughtController.updateTought);
router.post('/update-tought', checkAuth, ToughtController.updateToughtPost);
router.get('/delete-tought/:id', checkAuth, ToughtController.deleteTought);
router.post('/delete-tought', checkAuth, ToughtController.deleteToughtPost);
router.post('/search-tought', checkAuth, ToughtController.searchToughtPost);
router.post('/search-tought-all', ToughtController.searchToughtAllPost);

// router.get('/search-tought/:search', checkAuth, ToughtController.searchToughtPost);

module.exports = router;