const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        undefined: true,
        // minLength: [2, 'Minimum length'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    image: {
        type: String,
        required: [true, 'Url is required'],
        // match: [/^https?:\/\//,'Invalid url'],
    },
    freeRooms: {
        type: String,
        required: [true, 'Free rooms is required'],
        // min: [1, 'Minimum age'],
        // max: [100, 'Maximum age'],
    },
    usersBooked: [{
               type: mongoose.Types.ObjectId,
               required: true,
               ref: 'User',
            }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

});


const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;