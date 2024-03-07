const router = require('express').Router();

const heroManager = require('../managers/heroManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const heros = await heroManager.getAll().lean();

    res.render('heros/all-posts', { heros });
});

router.get('/create', (req, res) => {
    res.render('heros/create');
});

router.post('/create', async (req, res) => {
    const heroData = {
        ...req.body,
        owner: req.user._id,
    }; 

    try {
        await heroManager.create(heroData);
        res.redirect('/heros');

        } catch (error) {
            res.render('heros/create', {error: getErrorMessage(error)});
        }

});

router.get('/:heroId/details', async (req, res) => {
    const heroId = req.params.heroId;
    const hero = await heroManager.getOne(heroId).lean();
    const isOwner = req.user?._id == hero.owner?._id;
    // const isOwner = req.user?._id == hero.owner?._id.toString();

    const isVotedHero = hero.votes.find((x) => x.user == req.user?._id);

    // console.log(isVotedHero.user.toString());
    // console.log(req.user?._id);
  
    let isVote = false;

    if (isVotedHero.user.toString() == req.user?._id) {
        isVote = true;
    }


        try {

        res.render ('heros/details', { hero, isOwner, isVote });

    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful comment' });
    }
});

router.get('/:heroId/vote', async (req, res) => {
    const heroId = req.params.heroId;
    const user = req.user._id;

    console.log(heroId, user);

    try {

        await heroManager.vote(heroId, { user } );

        res.redirect(`/heros/${heroId}/details`);
    } catch (error) {
        // res.redirect(`/`, { error: 'Unsuccessful comment' });
        console.log(error);
    }
});

router.get('/:heroId/delete', async (req, res) => {
    try {
        const heroId = req.params.heroId;
        await heroManager.delete(heroId);
    
        res.redirect('/heros');
    } catch (error) {
        res.render(`/heros/${heroId}/details`, { error: 'Unsuccessful photo deletion' });
    }

});

router.get('/:heroId/edit', async (req, res) => {
    try {
        const heroId = req.params.heroId;
        const hero = await heroManager.getOne(heroId).lean();
    
        res.render('heros/edit', { hero });
    } catch (error) {
        res.render(`heros/edit`, { error: 'Unsuccessful photo edit' });
    }

});

router.post('/:heroId/edit', async (req, res) => {
    const heroId = req.params.heroId;
    const heroData = req.body;

    try {
        await heroManager.edit(heroId, heroData);
    
        res.redirect(`/heros/${heroId}/details`);
    } catch (error) {
        res.render(`heros/edit`, { error: 'Unsuccessful photo edit', ...heroData });
    }
});


module.exports = router;