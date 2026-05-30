const express = require('express');

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

const router = express.Router();

router.get('/me', auth, userCtrl.getMyProfile);
router.get('/:id', auth, userCtrl.getUserById);
router.put('/me', auth, userCtrl.updateMyProfile);
router.delete('/me', auth, userCtrl.deleteMyAccount);
router.get('/', auth, userCtrl.getAllUsers);

module.exports = router;