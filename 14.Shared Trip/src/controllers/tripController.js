const router = require('express').Router();

const tripManager = require('../managers/tripManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const trips = await tripManager.getAll().lean();

    res.render('trips/trips', { trips });
});

router.get('/create', (req, res) => {
    res.render('trips/create');
});

router.post('/create', async (req, res) => {
    const tripData = {
        ...req.body,
        creator: req.user._id,
    }; 

    try {
        await tripManager.create(req.user._id, tripData);
        res.redirect('/trips');

        } catch (error) {
            res.render('trips/create', { ...tripData, error: getErrorMessage(error)});
        }

});

router.get('/:tripId/details', async (req, res) => {
    const tripId = req.params.tripId;
    const trip = await tripManager.getOne(tripId).lean();
    const isOwner = req.user?._id == trip.creator._id;
    const userJoin = trip.buddies.some((x) => x._id.toString() === req.user?._id);
    let freeSeats = false;
    if (trip.seats > 0){
        freeSeats = true;
    } 

    res.render ('trips/details', { ...trip, isOwner, userJoin, freeSeats });
});

router.get('/:tripId/join', async (req, res) => {
    const tripId = req.params.tripId;
    const userId = req.user._id;

    try {
        await tripManager.join(tripId, userId);

        res.redirect(`/trips/${tripId}/details`);
    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful shared' });
    }
});

router.get('/:tripId/delete', async (req, res) => {
    try {
        const tripId = req.params.tripId;
        await tripManager.delete(tripId);
    
        res.redirect('/trips');
    } catch (error) {
        res.render(`/trips/${tripId}/details`, { error: 'Unsuccessful photo deletion' });
    }

});

router.get('/:tripId/edit', async (req, res) => {
    try {
        const tripId = req.params.tripId;
        const trip = await tripManager.getOne(tripId).lean();
    
        res.render('trips/edit', { ...trip });
    } catch (error) {
        res.render(`trips/edit`, { error: 'Unsuccessful photo edit' });
    }

});

router.post('/:tripId/edit', async (req, res) => {
    const tripId = req.params.tripId;
    const tripData = req.body;

    try {
        await tripManager.edit(tripId, tripData);
    
        res.redirect(`/trips/${tripId}/details`);
    } catch (error) {
        res.render(`trips/edit`, { error: 'Unsuccessful photo edit', ...tripData });
    }
});



module.exports = router;