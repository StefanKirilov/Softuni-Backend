const router = require('express').Router();

const heroManager = require('../managers/heroManager');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/profile', async (req, res) => {
    const heros = await heroManager.getByOwner(req.user._id).lean();

    res.render('my-posts', { heros });
});



module.exports = router;