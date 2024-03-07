const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Minimum length'],
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        minLength: [5, 'Minimum length'],
        // max: [100, 'Maximum age'],
    },
    image: {
        type: String,
        required: [true, 'Url is required'],
        match: [/^http?:\/\// || /^https?:\/\//,'Invalid url'],
    },
    bookReview: {
        type: String,
        required: [true, 'Book review is required'],
        minLength: [10, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        minLength: [3, 'Minimum length'],
    },
    stars: {
        type: Number,
        required: [true, 'Genre is required'],
        min: [1, 'Minimum stars'],
        max: [5, 'Maximum stars'],
    },
    wishingList: [
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


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;