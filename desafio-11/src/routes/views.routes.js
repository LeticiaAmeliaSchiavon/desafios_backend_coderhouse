const express = require('express');
const router = express.Router();

const ViewsController = require('../controllers/views.controller');

const viewsController = new ViewsController();

router.get('/', viewsController.login.bind(viewsController));

module.exports = router;

router.get('/', (req, res) => {
    res.redirect('/auth/login');
});

module.exports = router;