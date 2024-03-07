const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        // minLength: [2, 'Minimum length'],
    },
    years: {
        type: Number,
        required: [true, 'Years is required'],
        // match: [/^https?:\/\//,'Invalid url'],
    },
    kind: {
        type: String,
        required: [true, 'Kind is required'],
        // min: [1, 'Minimum age'],
        // max: [100, 'Maximum age'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    need: {
        type: String,
        required: [true, 'Need is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    donations: [
        {
            userId: {
               type: mongoose.Types.ObjectId,
               ref: 'User',
            },
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

});


const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;