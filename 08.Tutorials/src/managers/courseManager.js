const Course = require('../models/Course');

exports.create = (courseData) => Course.create(courseData);

exports.getAll = () => Course.find().populate('owner');

exports.getOne = (courseId) => Course.findById(courseId).populate('owner');

exports.delete = (courseId) => Course.findByIdAndDelete(courseId);

exports.edit = (courseId, courseData) => Course.findByIdAndUpdate(courseId, courseData);

exports.addCourse = async (courseId, user) =>{
    const course = await Course.findById(courseId);

    course.usersEnrolled.push(user);

    return course.save();
};

exports.getSearch = () => Course.find();

// exports.getByOwner = (userId) => Photo.find({owner: userId});