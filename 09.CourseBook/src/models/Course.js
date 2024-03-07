const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        // minLength: [2, 'Minimum length'],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        // min: [1, 'Minimum age'],
        // max: [100, 'Maximum age'],
    },
    certificate: {
        type: String,
        required: [true, 'Certificate is required'],
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
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    signUpList: [
         {
               type: mongoose.Types.ObjectId,
               ref: 'User',
            },
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;