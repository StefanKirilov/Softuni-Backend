const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Minimum length'],
    },
    image: {
        type: String,
        required: [true, 'Url is required'],
        match: [/^https?:\/\// || /^http?:\/\//,'Invalid url'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [1, 'Minimum price'],
        // max: [100, 'Maximum age'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    method: {
        type: String,
        required: [true, 'Method is required'],
    },
    buy: [
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


const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;