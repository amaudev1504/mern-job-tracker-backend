const express = require('express')

const auth = require('../middleware/auth');
const companyCtrl = require('../controllers/company');

const router = express.Router();

router.get('/my-companies', auth, companyCtrl.getMyCompanies);

router.post('/', auth, companyCtrl.createCompany);
router.get('/', auth, companyCtrl.getAllCompanies);

router.get('/:id', auth, companyCtrl.getCompanyById);
router.put('/:id', auth, companyCtrl.updateCompany);
router.delete('/:id', auth, companyCtrl.deleteCompany);

module.exports = router;