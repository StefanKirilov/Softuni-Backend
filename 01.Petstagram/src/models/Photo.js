const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Minimum length'],
    },
    image: {
        type: String,
        required: [true, 'Url is required'],
        match: [/^https?:\/\//,'Invalid url'],
    },
    age: {
        type: String,
        required: [true, 'Age is required'],
        min: [1, 'Minimum age'],
        max: [100, 'Maximum age'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [5, 'Minimum length'],
        maxLength: [50, 'Maximum length'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    commentList: [
        {
            user: {
               type: mongoose.Types.ObjectId,
               required: true,
               ref: 'User',
            },
            comment: {
                type: String,
                required: [true, 'Comment is required'],
            },
        }
    ],

});


const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;