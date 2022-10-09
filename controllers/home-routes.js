const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();

router.get("/",function(req,res){
    Post.findAll({})
    .then(data => {
        let post = data.map((post) => post.get({plain: true}))
        console.log("homeroute",post)
        res.render("homepage",{post})
    })
})
router.get("/dashboard",function(req,res){
    res.render("dashboard")
})


module.exports = router;