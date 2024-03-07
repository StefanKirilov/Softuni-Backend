const Course = require('../models/Course');
const User = require('../models/User');

exports.create = async (userId, courseData) => {
   const createdCourse = await Course.create(courseData);

   await User.findByIdAndUpdate(userId, {$push: {createdCourses: createdCourse._id}});
   return createdCourse;
}

exports.getAll = () => Course.find().populate('owner');

exports.getOne = (courseId) => Course.findById(courseId).populate('owner').populate('signUpList');

exports.delete = (courseId) => Course.findByIdAndDelete(courseId);

exports.edit = (courseId, courseData) => Course.findByIdAndUpdate(courseId, courseData);

exports.signUp = async (courseId, userId) =>{
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    course.signUpList.push(userId);
    user.signedUpCourses.push(courseId);

    await course.save();
    await user.save();
};

exports.getUser = (userId) => User.findById(userId).populate(['createdCourses', 'signedUpCourses']);

// exports.getByOwner = (userId) => Course.find({owner: userId});