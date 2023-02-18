const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        const user = await newUser.save();
        user.validate();
        res.status(200).json(user)

    }
    catch(err){
        res.status(500).json(err);
    }
});


//LOGIN
router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user){
            res.status(400).json("Wrong Crendentials!");
            return;
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        if(!validated){
            res.status(400).json("Wrong Crendentials!");
            return;
        }

        if(user && validated){
            const { password, ...others } = user._doc;  //check by removing ._doc
            res.status(200).json(others);
        }
        else{
            console.log("Wrong Crendentials!");
        }

    }
    catch(err){
        res.status(500).json(err);  //internal server error
    }
})

module.exports = router;


