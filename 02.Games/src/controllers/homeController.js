const router = require('express').Router();
const gameManager = require('../managers/gameManager');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/games/search', async (req, res) => {
    res.render('search');
});

router.post('/games/search', async (req, res) => {


    const allGames = await gameManager.getSearch().lean();


    const platform = req.body.platform;
    const name = req.body.name;


    const games = allGames.filter((x) => x.platform == platform && x.name == name);

    res.render('search', { games });
});

module.exports = router;