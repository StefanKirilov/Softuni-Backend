const router = require('express').Router();

const bookManager = require('../managers/bookManager');

router.get('/',async (req, res) => {

    const books = await bookManager.getAll().lean();

    res.render('home', { books });
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/profile', async (req, res) => {
    const books = await bookManager.getByOwner(req.user._id).lean();
    // console.log(req.user);

    res.render('profile', { books });
});



module.exports = router;