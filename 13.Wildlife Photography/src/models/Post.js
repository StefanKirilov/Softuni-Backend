const mongoose = require('mongoose');

const postSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: [true, 'Title is required'],
        // minLength: [2, 'Minimum length'],
    },
    keyword: {
        type: String,
        required: [true, 'Keyword is required'],
        // min: [1, 'Minimum age'],
        // max: [100, 'Maximum age'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    date: {
        type: String,
        required: [true, 'Date is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        // match: [/^https?:\/\//,'Invalid url'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        // minLength: [5, 'Minimum length'],
        // maxLength: [50, 'Maximum length'],
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    votes: [
         {
               type: mongoose.Types.ObjectId,
               ref: 'User',
            },
    ],
    rating: {
        type: Number,
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;