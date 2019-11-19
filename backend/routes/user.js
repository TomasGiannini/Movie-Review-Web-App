const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

// hash password and save user to database
router.post('/signup', (req, res, next) => {
  // hash the password, 10 refers to salting rounds
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'user created',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
});



module.exports = router;