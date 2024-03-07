const router = require('express').Router();
const electronicsManager = require('../managers/electronicsManager');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/electronics/search', async (req, res) => {
    const electronics = await electronicsManager.getSearch().lean();
    res.render('search' , { electronics });
});

router.post('/electronics/search', async (req, res) => {


    const allElectronics = await electronicsManager.getSearch().lean();


    const name = req.body.name.toLowerCase();
    const type = req.body.type.toLowerCase();


    const electronics = allElectronics.filter((x) => x.name.toLowerCase() == name || x.type.toLowerCase() == type);

    res.render('search', { electronics });
});


module.exports = router;