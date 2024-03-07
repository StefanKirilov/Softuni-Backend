const router = require('express').Router();
const postManager = require('../managers/postManager');

router.get('/',async (req, res) => {
    res.render('home');
});

router.get('/404', (req, res) => {
    res.render('404');
});


module.exports = router;