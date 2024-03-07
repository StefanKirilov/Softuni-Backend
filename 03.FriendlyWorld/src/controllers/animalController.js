const router = require('express').Router();

const animalManager = require('../managers/animalManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const allAnimals = await animalManager.getAll().lean();

    res.render('animals/dashboard', { allAnimals });
});

router.get('/create', (req, res) => {
    res.render('animals/create');
});

router.post('/create', async (req, res) => {
    const animalData = {
        ...req.body,
        owner: req.user._id,
    }; 

    try {
        await animalManager.create(animalData);
        res.redirect('/animals');

        } catch (error) {
            res.render('animals/create', {error: getErrorMessage(error)});
        }

});

router.get('/:animalId/details', async (req, res) => {
    const animalId = req.params.animalId;

    const animal = await animalManager.getOne(animalId).lean();

    const isOwner = req.user?._id == animal.owner._id.toString();

    const isDonateAnimal = animal.donations.find((x) => x._id == req.user?._id);

    console.log(animal.donations);
    console.log(req.user?._id);
  
    let isDonate = false;

    if (isDonateAnimal !== undefined) {
        isDonate = true;
    }

    // const isBuy = req.user?._id == game.boughtBy[0]?.user.toString();

    // const user = req.user?._id;

        try {
        // await gameManager.buyGame(gameId, { user , boughtBy});

        res.render ('animals/details', { animal, isOwner, isDonate });

        // res.redirect(`/games/${gameId}/details`);
    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful comment' });
    }
});


router.get('/:animalId/delete', async (req, res) => {
    try {
        const animalId = req.params.animalId;
        await animalManager.delete(animalId);
    
        res.redirect('/animals');
    } catch (error) {
        res.render(`animals/${animalId}/details`, { error: 'Unsuccessful photo deletion' });
    }

});

router.get('/:animalId/edit', async (req, res) => {
    try {
        const animalId = req.params.animalId;
        const animal = await animalManager.getOne(animalId).lean();
    
        res.render('animals/edit', { animal });
    } catch (error) {
        res.render(`animals/edit`, { error: 'Unsuccessful photo edit' });
    }

});

router.post('/:animalId/edit', async (req, res) => {
    const animalId = req.params.animalId;
    const animalData = req.body;
    

    try {
        await animalManager.edit(animalId, animalData);
    
        res.redirect(`/animals/${animalId}/details`);
    } catch (error) {
        res.render(`animals/edit`, { error: 'Unsuccessful photo edit', ...animalData });
    }
});

router.get('/:animalId/donate', async (req, res) => {

    const animalId = req.params.animalId;
    const user = req.user._id;


    try {

        await animalManager.donate(animalId,  user  );
        // let game = await gameManager.getOne(gameId);
        // game.boughtBy.push(user);
        // console.log('----------------------');
        // await game.save();

        res.redirect(`/animals/${animalId}/details`);
    } catch (error) {
        // res.redirect(`/`, { error: 'Unsuccessful comment' });
        console.log(error);
    }
});


module.exports = router;