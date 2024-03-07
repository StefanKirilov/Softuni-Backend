const router = require('express').Router();

const hotelManager = require('../managers/hotelManager');
const { getErrorMessage } = require('../utils/errorHelpers');

// router.get('/', async (req, res) => {
//     const photos = await photoManager.getAll().lean();

//     res.render('photos/catalog', { photos });
// });

router.get('/create', (req, res) => {
    res.render('hotels/create');
});

router.post('/create', async (req, res) => {
    const hotelData = {
        ...req.body,
        owner: req.user._id,
    }; 

    try {
        await hotelManager.create(hotelData);
        res.redirect('/');

        } catch (error) {
            res.render('hotels/create', {error: getErrorMessage(error)});
        }

});

router.get('/:hotelId/details', async (req, res) => {
    const hotelId = req.params.hotelId;

    const hotel = await hotelManager.getOne(hotelId).lean();

    const isOwner = req.user?._id == hotel.owner._id;

    console.log(hotel);

    // const isBookingHotel = hotel.bookedHotels.find((x) => x._id == req.user?._id);
    // let isBooking = false;

    // if (isBookingHotel !== undefined) {
    //     isBooking = true;
    // }

        try {
        res.render ('hotels/details', { hotel, isOwner});

    } catch (error) {
        res.redirect(`/`, { error: 'Unsuccessful buy' });
    }
});

router.get('/:hotelId/booking', async (req, res) => {

    const hotelId = req.params.hotelId;
    const userId = req.user._id;


    try {

        await hotelManager.booking(hotelId, userId );

        res.redirect(`/hotels/${hotelId}/details`);
    } catch (error) {
        console.log(error);
        res.redirect(`/`, { error: 'Unsuccessful booking' });
    }
});

router.get('/:hotelId/delete', async (req, res) => {
    try {
        const hotelId = req.params.hotelId;
        await hotelManager.delete(hotelId);
    
        res.redirect('/');
    } catch (error) {
        res.render(`/hotels/${hotelId}/details`, { error: 'Unsuccessful photo deletion' });
    }

});

router.get('/:hotelId/edit', async (req, res) => {
    try {
        const hotelId = req.params.hotelId;
        const hotel = await hotelManager.getOne(hotelId).lean();
    
        res.render('hotels/edit', { hotel });
    } catch (error) {
        res.render(`hotels/edit`, { error: 'Unsuccessful hotel edit' });
    }

});

router.post('/:hotelId/edit', async (req, res) => {
    const hotelId = req.params.hotelId;
    const hotelData = req.body;

    try {
        await hotelManager.edit(hotelId, hotelData);
    
        res.redirect(`/hotels/${hotelId}/details`);
    } catch (error) {
        res.render(`hotels/edit`, { error: 'Unsuccessful hotel edit', ...hotelData });
    }
});

// router.post('/:photoId/comments', async (req, res) => {
//     const photoId = req.params.photoId;
//     const { comment } = req.body;
//     const user = req.user._id;

//     try {
//         await photoManager.addComment(photoId, { user , comment});
    
//         res.redirect(`/photos/${photoId}/details`);
//     } catch (error) {
//         res.redirect(`/`, { error: 'Unsuccessful comment' });
//     }
// });


module.exports = router;