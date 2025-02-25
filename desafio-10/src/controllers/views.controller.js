class ViewsController {
    async login(req, res) {
        res.render('login');
    }

    async register(req, res) {
        res.render('register');
    }
}

module.exports = ViewsController;