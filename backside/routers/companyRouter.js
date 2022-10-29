const router = require('express').Router();
const authCompany = require('../middlewares/authCompany');
const companyCtrl = require ('../controllers/companyCtrl')

router.get('/searchCompany',authCompany, companyCtrl.searchCompany)
router.get('/company/:id',authCompany, companyCtrl.getCompany)
router.patch('/company',authCompany, companyCtrl.updateCompany)
router.patch('/company/:id/follow',authCompany, companyCtrl.follow)
router.patch('/company/:id/unfollow',authCompany, companyCtrl.unfollow)


module.exports = router;