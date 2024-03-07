const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema ({
    startPoint: {
        type: String,
        required: [true, 'Start point is required'],
        // minLength: [2, 'Minimum length'],
    },
    endPoint: {
        type: String,
        required: [true, 'End point  is required'],
        // min: [1, 'Minimum age'],
        // max: [100, 'Maximum age'],
    },
    date: {
        type: String,
        required: [true, 'Date is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
        // match: [/^https?:\/\//,'Invalid url'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        // match: [/^https?:\/\//,'Invalid url'],
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        // match: [/^https?:\/\//,'Invalid url'],
    },
    seats: {
        type: Number,
        required: [true, 'Seats is required'],
        // match: [/^https?:\/\//,'Invalid url'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        // match: [/^https?:\/\//,'Invalid url'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        // match: [/^https?:\/\//,'Invalid url'],
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buddies: [
         {
               type: mongoose.Types.ObjectId,
               ref: 'User',
            },
    ],
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;