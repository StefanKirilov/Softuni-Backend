const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        // minLength: [2, 'Minimum length'],
    },
    species: {
        type: String,
        required: [true, 'species is required'],
        // match: [/^https?:\/\//,'Invalid url'],
    },
    skinColor: {
        type: String,
        required: [true, 'skinColor is required'],
        // min: [1, 'Minimum age'],
        // max: [100, 'Maximum age'],
    },
    eyeColor: {
        type: String,
        required: [true, 'eyeColor is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    image: {
        type: String,
        required: [true, 'image is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    votes: [
        {
            user: {
               type: mongoose.Types.ObjectId,
               required: true,
               ref: 'User',
            },
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

});


const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;