const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/User");

router.get("/", auth, (req, res)=>{
    if(req.user.admin){ //Como o middleware enviou para o 'req' o 'user'(req.user) EEE na linha 30 do arq userController(const token = jwt.sign({id: user._id, admin: user.admin}, process.env.TOKEN_SECRET)) o sign estipulou tanto o 'ID' quando o 'ADMIN', é certo usá-lo desta forma(req.user.admin)
        res.send("You are Admin")
    } else{
        res.status(401).send("You are not admin")
    }
})

router.get("/free", auth, (req, res)=>{
    try {
        res.send("All logged users could use this Page")
    } 
    catch (error) {
        res.status(401).send("Error detected")
    }
})

module.exports = router;