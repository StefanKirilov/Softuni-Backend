const router = require('express').Router();

const gameManager = require('../managers/gameManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const games = await gameManager.getAll().lean();

    res.render('games/catalog', { games });
});

router.get('/create', (req, res) => {
    res.render('games/create');
});

router.post('/create', async (req, res) => {
    const gameData = {
        ...req.body,
        owner: req.user._id,
    }; 

    try {
        await gameManager.create(gameData);
        res.redirect('/games');

        } catch (error) {
            res.render('games/create', {error: getErrorMessage(error)});
        }

});

router.get('/:gameId/details', async (req, res) => {
    const gameId = req.params.gameId;

    const game = await gameManager.getOne(gameId).lean();

    const isOwner = req.user?._id == game.owner._id;

    const isBuyGame = game.boughtBy.find((x) => x.user == req.user?._id);
    let isBuy = false;

    if (isBuyGame !== undefined) {
        isBuy = true;
    }

    // const isBuy = req.user?._id == game.boughtBy[0]?.user.toString();

    const user = req.user?._id;

        try {
        // await gameManager.buyGame(gameId, { user , boughtBy});

        res.render ('games/details', { game, isOwner, isBuy });

        // res.redirect(`/games/${gameId}/details`);
    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful comment' });
    }
});


router.get('/:gameId/delete', async (req, res) => {
    try {
        const gameId = req.params.gameId;
        await gameManager.delete(gameId);
    
        res.redirect('/games');
    } catch (error) {
        res.render(`games/${gameId}/details`, { error: 'Unsuccessful photo deletion' });
    }

});

router.get('/:gameId/edit', async (req, res) => {
    try {
        const gameId = req.params.gameId;
        const game = await gameManager.getOne(gameId).lean();
    
        res.render('games/edit', { game });
    } catch (error) {
        res.render(`games/edit`, { error: 'Unsuccessful photo edit' });
    }

});

router.post('/:gameId/edit', async (req, res) => {
    const gameId = req.params.gameId;
    const gameData = req.body;

    try {
        await gameManager.edit(gameId, gameData);
    
        res.redirect(`/games/${gameId}/details`);
    } catch (error) {
        res.render(`games/edit`, { error: 'Unsuccessful photo edit', ...gameData });
    }
});

router.get('/:gameId/buy', async (req, res) => {

    const gameId = req.params.gameId;
    const user = req.user._id;

    try {

        await gameManager.buyGame(gameId, { user } );
        // let game = await gameManager.getOne(gameId);
        // game.boughtBy.push(user);
        // console.log('----------------------');
        // await game.save();

        res.redirect(`/games/${gameId}/details`);
    } catch (error) {
        // res.redirect(`/`, { error: 'Unsuccessful comment' });
        console.log(error);
    }
});


module.exports = router;