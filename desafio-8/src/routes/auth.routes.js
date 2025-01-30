const express = require('express');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();
const authController = new AuthController();

// Rota para exibir o formulário de login (GET)
router.get('/login', authController.login.bind(authController));

// Rota para processar o formulário de login (POST)
router.post('/login', authController.login.bind(authController));

// Rota para autenticação com GitHub (GET)
router.get('/github', authController.loginGitHub.bind(authController));

// Rota de callback do GitHub (GET)
router.get('/github/callback', authController.loginGitHubCallback.bind(authController));

// Rota para exibir o formulário de registro (GET)
router.get('/register', authController.showRegisterForm.bind(authController));

// Rota para processar o formulário de registro (POST)
router.post('/register', authController.register.bind(authController));

// Rota para logout (GET)
router.get('/logout', authController.logout.bind(authController));

module.exports = router;