const router = require('express').Router();
const housingManager = require('../managers/housingManager');

router.get('/', async (req, res) => {
    const houses = await housingManager.getAll().lean();

    res.render('home', { houses });
});

router.get('/search', async (req, res) => {
    res.render('search');
});

router.post('/search', async (req, res) => {

    const allHouses = await housingManager.getSearch().lean();
    const search = req.body.search;
    const houses = allHouses.filter((x) => x.type.toLowerCase() == search.toLowerCase());


    res.render('search', { houses });
});

router.get('/404', (req, res) => {
    res.render('404');
});


module.exports = router;