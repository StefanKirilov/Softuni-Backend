const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [6, 'Minimum length'],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [1850, 'Minimum year'],
        max: [2021, 'Maximum year'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        minLength: [4, 'Minimum length'],
    },
    image: {
        type: String,
        required: [true, 'Url is required'],
        match: [/^https?:\/\// || /^http?:\/\//,'Invalid url'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [60, 'Minimum length'],
    },
    pieces: {
        type: Number,
        required: [true, 'Pieces is required'],
        min: [0, 'Minimum pieces'],
        max: [10, 'Maximum pieces'],
    },
    rented: [{
               type: mongoose.Types.ObjectId,
               ref: 'User',
            }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

});


const Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;