const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where:{
            user_id: req.session.user_id
        },

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
      res.render('dashboard', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findOne({
        where:{
            user_id:req.session.user_id
        },

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
      res.render('edit-post', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/create/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where:{
            user_id: req.sessions.user_id
        },

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
      res.render('create-post', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;