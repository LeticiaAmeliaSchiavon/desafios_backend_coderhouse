const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../dao/models/user.model');
const router = express.Router();

const saltRounds = 10;

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hashedPassword,
      role: email === 'adminCoder@coder.com' ? 'admin' : 'user'
    });

    await newUser.save();
    res.redirect('/auth/login');
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/products',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/auth/login'
}), (req, res) => {
  res.redirect('/products');
});

module.exports = router;
