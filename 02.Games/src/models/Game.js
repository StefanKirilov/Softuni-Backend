const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        // minLength: [2, 'Minimum length'],
    },
    image: {
        type: String,
        required: [true, 'Url is required'],
        // match: [/^https?:\/\//,'Invalid url'],
    },
    price: {
        type: Number,
        required: [true, 'Age is required'],
        // min: [1, 'Minimum age'],
        // max: [100, 'Maximum age'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    genre: {
        type: String,
        required: [true, 'Location is required'],
    },
    platform: {
        type: String,
        required: [true, 'Description is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    boughtBy: [
        {
            user: {
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


const Game = mongoose.model('Game', gameSchema);

module.exports = Game;