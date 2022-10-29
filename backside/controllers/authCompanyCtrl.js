const Companies = require("../models/companyModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authCompanyCtrl = {
    createCompany: async (req,res)=>{
        try {
            const {fullname, email, password} = req.body;

            const newFullname = fullname.toLowerCase().replace(/ /g,'');

            const company_name = await Companies.findOne({fullname: newFullname})
            if (company_name) return res.status(400).json({msg: 'this company name already exists'})

            const Email = await Companies.findOne({email: email})
            if(Email) return res.status(400).json({msg: 'this email already exists'})

            if(password.length < 8) return res.status(400).json({msg: "password must be at least 8 characters along"})

            const passwordHash = await bcrypt.hash(password,13);

            const newCompany = new Companies({
                 fullname:newFullname ,email, password:passwordHash
            })


            const access_token= createAccessToken({id: newCompany._id});
            const refresh_token= createRefreshToken({id: newCompany._id});


            res.cookie('refreshtoken', refresh_token,{
                httpOnly: true,
                path:'/api/refresh_token',
                maxAge: 24*30*60*60*1000   //30days
            })

            await newCompany.save();

            res.json({
                msg:"registerd sucess",
                access_token,
                company:{
                    ...newCompany._doc,
                    password:''
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    loginCompany: async (req,res)=>{
        try {
            const {email , password} = req.body;

            const user = await Users.findOne({email})
                .populate("friends following" , "-password")

            if(!user) return res.status(400).json({msg: 'User does not exists'})

            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch) return res.status(400).json({msg: 'User Passowrd is incorrect'})

            const access_token= createAccessToken({id: user._id});
            const refresh_token= createRefreshToken({id: user._id});


            res.cookie('refreshtoken', refresh_token,{
                httpOnly: true,
                path:'/api/refresh_token',
                maxAge: 24*30*60*60*1000   //30days
            })



            res.json({
                msg:"login sucess",
                access_token,
                user:{
                    ...user._doc,
                    password:''
                }
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    quitCompany: async (req,res)=>{
        try {
            res.clearCookie('refreshtoken',{path:'/api/refresh_token'})
            res.json({msg:"Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    generateAccessToken: async (req,res)=>{
        try {
            const rf_token = req.cookies.refreshtoken;


            if(!rf_token) return res.status(400).json({msg:"please login now"})

            jwt.verify(rf_token, process.env.REFRESHTOKENSECRET, async(err,result)=>{
                if(err) return res.status(400).json({msg:"Please login now"})

                const user = await Users.findById(result.id).select("-password")
                    .populate("friends following")

                if(!user) return res.status(400).json({msg:"user does not exist"})

                const access_token= createAccessToken({id: result.id});

                res.json({
                    access_token,
                    user
                })

            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}


const createAccessToken = ( payload) =>{
    return jwt.sign(payload, process.env.ACCESSTOKENSECRET, {expiresIn: "1d"})
}

const createRefreshToken = ( payload) =>{
    return jwt.sign(payload, process.env.REFRESHTOKENSECRET,{expiresIn: "30d"})
}
module.exports = authCompanyCtrl