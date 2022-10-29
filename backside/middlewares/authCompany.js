const Companies = require("../models/companyModel");
const jwt = require('jsonwebtoken');

const authCompany = async (req,res,next) =>{
    try {
        const token = req.header("Authorization")

        if(!token)  return res.status(500).json({msg: "Not Valid"})

        const decoded = jwt.verify(token, process.env.ACCESSTOKENSECRET)
        if(!decoded)  return res.status(500).json({msg: "Not Valid"})

        const company = await Companies.findOne({_id: decoded.id})

        req.user = company;

        next();

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authCompany;