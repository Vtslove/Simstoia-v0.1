const router = require('express').Router();
const authCompanyCtrl = require("../controllers/authCompanyCtrl");

router.post('/createCompany',authCompanyCtrl.createCompany);

router.post('/loginCompany',authCompanyCtrl.loginCompany);

router.post('/quitCompany',authCompanyCtrl.quitCompany);

router.post('/refresh_token',authCompanyCtrl.generateAccessToken);

module.exports = router;