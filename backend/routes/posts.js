const express = require('express');
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();


router.post("", checkAuth, (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId,
    album: req.body.album,
    year: req.body.year,
    genre: req.body.genre,
    comment: req.body.comment,
    track: req.body.track,
    zeroByte: req.body.zeroByte,
    header: req.body.header
  });
  //adding to database
  post.save()
    .then((createdPost) => {
      res.status(201).json({
        message: 'Post added successfully',
        postId: createdPost._id
      });
    });
});

router.put('/:id', checkAuth, (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  // post must meet these id and creator requirements in order for them to be updated
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
  .then(result => {
    if (result.nModified > 0) {
      res.status(200).json({ message: 'update successful' });
    } else {
      res.status(401).json({ message: 'Not authorized' });
    }
  });
});

router.get("", (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
      });
    });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' })
      }
    });
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id })
  .then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'post deleted' });
    } else {
      res.status(401).json({ message: 'Not authorized' });
    }
  });
});

module.exports = router;
