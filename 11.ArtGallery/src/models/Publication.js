const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: [true, 'Title is required'],
        // minLength: [2, 'Minimum length'],
    },
    paintingTech: {
        type: String,
        required: [true, 'Painting is required'],
        // min: [1, 'Minimum age'],
        // max: [100, 'Maximum age'],
    },
    picture: {
        type: String,
        required: [true, 'Picture is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    certificate: {
        type: String,
        required: [true, 'Certificate is required'],
        // match: [/^https?:\/\//,'Invalid url'],
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    usersShared: [
         {
               type: mongoose.Types.ObjectId,
               ref: 'User',
            },
    ],
});

const Publication = mongoose.model('Publication', publicationSchema);
module.exports = Publication;