const router = require('express').Router();

const electronicsManager = require('../managers/electronicsManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const electronics = await electronicsManager.getAll().lean();

    res.render('electronics/catalog', { electronics });
});

router.get('/create', (req, res) => {
    res.render('electronics/create');
});

router.post('/create', async (req, res) => {
    const electronicsData = {
        ...req.body,
        owner: req.user._id,
    }; 

    try {
        await electronicsManager.create(electronicsData);
        res.redirect('/');

        } catch (error) {
            res.render('electronics/create', {...electronicsData, error: getErrorMessage(error)});
        }

});

router.get('/:electronicsId/details', async (req, res) => {
    const electronicsId = req.params.electronicsId;
    const electronics = await electronicsManager.getOne(electronicsId).lean();

    const isOwner = req.user?._id == electronics.owner._id;

    const isBuy = electronics.buyingList.some((x) => x == req.user?._id);

        try {
        res.render ('electronics/details', { electronics, isOwner, isBuy });

    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful course' });
    }
});

router.get('/:electronicsId/buy', async (req, res) => {

    const electronicsId = req.params.electronicsId;
    const userId = req.user._id;


    try {
        await electronicsManager.buy(electronicsId, userId );

        res.redirect(`/electronics/${electronicsId}/details`);
    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful course' });
    }
});

router.get('/:electronicsId/delete', async (req, res) => {
    try {
        const electronicsId = req.params.electronicsId;
        await electronicsManager.delete(electronicsId);
    
        res.redirect('/electronics');
    } catch (error) {
        res.render(`/electronics/${electronicsId}/details`, { error: 'Unsuccessful course deletion' });
    }

});

router.get('/:electronicsId/edit', async (req, res) => {
    try {
        const electronicsId = req.params.electronicsId;
        const electronics = await electronicsManager.getOne(electronicsId).lean();
    
        res.render('electronics/edit', { ...electronics });
    } catch (error) {
        res.render(`electronics/edit`, {...electronics, error: 'Unsuccessful course edit' });
    }

});

router.post('/:electronicsId/edit', async (req, res) => {
    const electronicsId = req.params.electronicsId;
    const electronicsData = req.body;

    try {
        await electronicsManager.edit(electronicsId, electronicsData);
    
        res.redirect(`/electronics/${electronicsId}/details`);
    } catch (error) {
        res.render(`electronics/edit`, { error: 'Unsuccessful course edit', ...electronicsData });
    }
});


module.exports = router;