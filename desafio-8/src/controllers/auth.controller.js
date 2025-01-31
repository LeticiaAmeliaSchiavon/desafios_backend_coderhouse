const passport = require('passport');
const UserService = require('../services/user.service');

const userService = new UserService();

class AuthController {
    // Exibe o formulário de registro (GET)
    async showRegisterForm(req, res) {
        res.render('register');
    }

    // Processa o formulário de registro (POST)
    async register(req, res) {
        const { email, password } = req.body;
        try {
            await userService.createUser(email, password);
            res.redirect('/auth/login');
        } catch (error) {
            // Passa uma mensagem de erro para a view
            res.render('register', { error: 'Erro ao registrar usuário. Tente novamente.' });
        }
    }

    // Processa o formulário de login (POST)
    async login(req, res, next) {
        // Retorna o middleware de autenticação do Passport
        return passport.authenticate('local', {
            successRedirect: '/products',
            failureRedirect: '/auth/login',
            failureFlash: true, // Habilita mensagens flash para erros
        })(req, res, next);
    }

    // Inicia a autenticação com GitHub (GET)
    async loginGitHub(req, res, next) {
        // Retorna o middleware de autenticação do Passport
        return passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
    }

    // Callback da autenticação com GitHub (GET)
    async loginGitHubCallback(req, res, next) {
        // Retorna o middleware de autenticação do Passport
        return passport.authenticate('github', {
            successRedirect: '/products',
            failureRedirect: '/auth/login',
        })(req, res, next);
    }

    // Processa o logout (GET)
    async logout(req, res) {
        req.logout((err) => {
            if (err) {
                return res.status(500).send('Erro ao fazer logout.');
            }
            res.redirect('/auth/login');
        });
    }
}

module.exports = AuthController;