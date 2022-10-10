const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

// router.get("/",function(req,res){
//     Post.findAll({})
//     .then(data => {
//         let post = data.map((post) => post.get({plain: true}))
//         console.log("homeroute",post)
//         res.render("homepage",{post})
//     })
// })
// router.get("/dashboard",function(req,res){
//     res.render("dashboard")
// })

//GET
router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        attribute:['id', 'title', 'post_content'],
        include: [{
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id,'],
          iclude:{
            model: User,
            attributes:['usernmae']
          }
        }]
      });
      const post = postData.map((project) => post.get({ plain: true }));

      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

  router.get('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findOne({
        attribute:['id', 'title', 'post_content'],
        include: [{
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id,'],
          iclude:{
            model: User,
            attributes:['usernmae']
          }
        }]
      });
      const post = postData.map((project) => post.get({ plain: true }));

      // Pass serialized data and session flag into template
      res.render('single-post', { 
        post, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;