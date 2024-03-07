const mongoose = require('mongoose');

const electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        // minLength: [2, 'Minimum length'],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    damages: {
        type: String,
        required: [true, 'Damages is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    image: {
        type: String,
        required: [true, 'Url is required'],
        // match: [/^https?:\/\//,'Invalid url'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    production: {
        type: Number,
        required: [true, 'Production is required'],
        // min: [1, 'Minimum age'],
        // max: [100, 'Maximum age'],
    },
    exploitation: {
        type: Number,
        required: [true, 'Exploitation is required'],
        // min: [1, 'Minimum age'],
        // max: [100, 'Maximum age'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        // min: [1, 'Minimum age'],
        // max: [100, 'Maximum age'],
    },
    buyingList: [{
           type: mongoose.Types.ObjectId,
           required: true,
           ref: 'User',
        }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }

});


const Electronics = mongoose.model('Electronics', electronicsSchema);

module.exports = Electronics;