const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../dao/models/user.model');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

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

module.exports = router;
