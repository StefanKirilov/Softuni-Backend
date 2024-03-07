const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true,
        // minLength: [2, 'Minimum length'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        // minLength: [5, 'Minimum length'],
        maxLength: [50, 'Maximum length'],
    },
    image: {
        type: String,
        required: [true, 'Url is required'],
        // match: [/^https?:\/\//,'Invalid url'],
    },
    duration: {
        type: String,
        required: [true, 'Duration is required'],
        // min: [1, 'Minimum age'],
        // max: [100, 'Maximum age'],
    },
    createdAt: {
        type: String,
    },
    usersEnrolled: [        {
        user: {
           type: mongoose.Types.ObjectId,
           required: true,
           ref: 'User',
        },
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
    // commentList: [
    //     {
    //         user: {
    //            type: mongoose.Types.ObjectId,
    //            required: true,
    //            ref: 'User',
    //         },
    //         comment: {
    //             type: String,
    //             required: [true, 'Comment is required'],
    //         },
    //     }
    // ],

});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;