const Companies = require("../models/companyModel");


const companyCtrl = {
    searchCompany: async (req,res)=>{
        try {
            const companies =  await Companies.find({fullname : {$regex: req.query.fullname}}).limit(10)
                .select("fullname avatar")

            res.json({companies})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getCompany: async (req,res)=>{
        try {
            const company =  await Companies.findOne({_id : req.params.id})
                .select("-password").populate("friends following" , "-password")
            if(!company) return res.status(400).json({msg: "No company Exists"})
            res.json({company})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCompany: async (req,res) =>{
        try {

            const { website, fullname, story, phone, address } =req.body;
            if(!fullname)  return res.status(500).json({msg: "Fullname is requires"})

            const company = await Companies.findOneAndUpdate({_id: req.body._id},{
                website, fullname, story, phone, address
            })

            res.json({msg:'update success', company})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    follow: async (req,res) =>{
        try {

            const user = await Users.find({_id: req.params.id, friends: req.user._id} )
            if(user.length > 0) return res.status(400).json({msg: "you have already followed"})

            const newUser = await Users.findOneAndUpdate({_id: req.params.id},{
                $push: {friends: req.user._id}
            },{ new: true}).populate("friends following", "-password")

            await Users.findOneAndUpdate({_id: req.user._id},{
                $push:{following: req.params.id}
            },{ new: true})


            res.json({newUser})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    unfollow: async (req,res) =>{
        try {



            const newUser = await Users.findOneAndUpdate({_id: req.params.id},{
                $pull:{friends: req.user._id}
            },{ new: true}).populate("friends following" , "-password")

            await Users.findOneAndUpdate({_id: req.user._id},{
                $pull:{following: req.params.id}
            },{ new: true})


            res.json({newUser})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}

module.exports = companyCtrl;