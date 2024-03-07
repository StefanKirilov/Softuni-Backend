const router = require('express').Router();

const cryptoManager = require('../managers/cryptoManager');

router.get('/',async (req, res) => {
    const cryptos = await cryptoManager.getAll().lean();

    res.render('home', { cryptos });
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/search', async (req, res) => {
    res.render('search');
});

router.post('/search', async (req, res) => {


    const allCryptos = await cryptoManager.getSearch().lean();


    const method = req.body.method;
    const name = req.body.name;

    // console.log(req.body.method);
    // console.log(req.body.name);
    // console.log(Object.assign({}, req.body));


    const cryptos = allCryptos.filter((x) => x.name == name && x.method == method);

    res.render('search', { cryptos });
});

// router.get('/profile', async (req, res) => {
//     const photos = await photoManager.getByOwner(req.user._id).lean();

//     res.render('profile', { photos, photoCount: photos.length });
// });



module.exports = router;