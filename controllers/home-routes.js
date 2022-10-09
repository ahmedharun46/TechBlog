const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();

router.get("/",function(req,res){
    res.render("homepage")
})


module.exports = router;