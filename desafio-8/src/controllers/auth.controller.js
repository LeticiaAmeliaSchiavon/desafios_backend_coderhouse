const passport = require('passport');
const UserService = require('../services/user.service');

const userService = new UserService();

class AuthController {
    async showRegisterForm(req, res) {
        res.render('register'); // Renderiza o formulário de registro (GET)
    }

    async register(req, res) {
        const { email, password } = req.body;
        try {
            await userService.createUser(email, password);
            res.redirect('/auth/login');
        } catch (error) {
            res.redirect('/auth/register');
        }
    }

    async login(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/products',
            failureRedirect: '/auth/login',
            failureFlash: true,
        })(req, res, next);
    }

    async loginGitHub(req, res, next) {
        passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
    }

    async loginGitHubCallback(req, res, next) {
        passport.authenticate('github', {
            successRedirect: '/products',
            failureRedirect: '/auth/login',
        })(req, res, next);
    }

    async logout(req, res) {
        req.logout();
        res.redirect('/auth/login');
    }
}

module.exports = AuthController;