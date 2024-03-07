const router = require('express').Router();

const animalManager = require('../managers/animalManager');

router.get('/', async (req, res) => {

    const allAnimals = await animalManager.getAll().lean();

    res.render('home', { allAnimals });
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/search', async (req, res) => {
    res.render('search');
});

router.post('/search', async (req, res) => {


    const allAnimals = await animalManager.getSearch().lean();
;
    const search = req.body.search;


    const animals = allAnimals.filter((x) => x.location == search);

    res.render('search', { animals });
});


module.exports = router;