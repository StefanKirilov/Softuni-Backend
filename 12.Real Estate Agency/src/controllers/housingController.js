const router = require('express').Router();

const housingManager = require('../managers/housingManager');
const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    const houses = await housingManager.getAll().lean();

    res.render('houses/catalog', { houses });
});

router.get('/create',isAuth, (req, res) => {
    res.render('houses/create');
});

router.post('/create', isAuth , async (req, res) => {
    const houseData = {
        ...req.body,
        owner: req.user._id,
    }; 

    try {
        await housingManager.create(houseData);
        res.redirect('/houses');

        } catch (error) {
            res.render('houses/create', {...houseData, error: getErrorMessage(error)});
        }

});

router.get('/:houseId/details', async (req, res) => {
    const houseId = req.params.houseId;

    const house = await housingManager.getOne(houseId).lean();

    const isOwner = req.user?._id == house.owner._id;
    const isRent = house.rented.some((x) => x._id == req.user?._id);

    const peopleRent = house.rented.map((x) => x.name).join(', ');

    let isAvailable = false;
    if (house.pieces > 0){
        isAvailable = true;
    }

        try {
        res.render ('houses/details', { ...house, isOwner, isRent, isAvailable, peopleRent});

    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful buy' });
    }
});

router.get('/:houseId/rent', async (req, res) => {

    const houseId = req.params.houseId;
    const userId = req.user._id;

    try {
        await housingManager.rent(houseId, userId );
        res.redirect(`/houses/${houseId}/details`);

    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful rent' });
    }
});

router.get('/:houseId/delete', isAuth, async (req, res) => {
    try {
        const houseId = req.params.houseId;
        await housingManager.delete(houseId);
    
        res.redirect('/houses');
    } catch (error) {
        res.render(`/houses/${houseId}/details`, { error: 'Unsuccessful crypto' });
    }

});

router.get('/:houseId/edit', isAuth, async (req, res) => {
    try {
        const houseId = req.params.houseId;
        const house = await housingManager.getOne(houseId).lean();
    
        res.render('houses/edit', { ...house });
    } catch (error) {
        res.render(`houses/edit`, { error: 'Unsuccessful crypto edit' });
    }

});

router.post('/:houseId/edit', isAuth , async (req, res) => {
    const houseId = req.params.houseId;
    const  houseData = req.body;

    try {
        await housingManager.edit(houseId, houseData);
    
        res.redirect(`/houses/${houseId}/details`);
    } catch (error) {
        res.render(`houses/edit`, { error: 'Unsuccessful house edit', ...houseData });
    }
});


module.exports = router;