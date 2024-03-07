const Book = require('../models/Book');

exports.create = (bookData) => Book.create(bookData);

exports.getAll = () => Book.find().populate('owner');

exports.getOne = (bookId) => Book.findById(bookId).populate('owner');

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData);

// exports.addComment = async (photoId, commentData) =>{
//     const photo = await Photo.findById(photoId);

//     photo.commentList.push(commentData);

//     return photo.save();
// };

exports.wishBook = async (bookId, user) =>{
    const book = await Book.findById(bookId);

    book.wishingList.push(user);
    return book.save();
};

exports.getByOwner = (userId) => Book.find({owner: userId});