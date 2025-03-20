const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcrypt');
const UserService = require('../services/user.service');
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require('./config');

const userService = new UserService();

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    const user = await userService.findUserByEmail(email);
    if (!user) {
        return done(null, false, { message: 'Usuário não encontrado.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return done(null, false, { message: 'Senha incorreta.' });
    }
    return done(null, user);
}));

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback',
}, async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    let user = await userService.findUserByEmail(email);
    if (!user) {
        user = await userService.createUser(email, profile.id); // Usando o ID do GitHub como senha
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userService.findUserById(id);
    done(null, user);
});