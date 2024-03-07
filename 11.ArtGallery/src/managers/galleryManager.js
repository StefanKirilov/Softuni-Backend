const Publication = require('../models/Publication');
const User = require('../models/User');

exports.create = async (userId, publicationData) => {
   const createdPublication = await Publication.create(publicationData);

   await User.findByIdAndUpdate(userId, {$push: {myPublication: createdPublication._id}});
   return createdPublication;
}

exports.getAll = () => Publication.find().populate('author');

exports.getOne = (publicationId) => Publication.findById(publicationId).populate('author').populate('usersShared');

exports.delete = (publicationId) => Publication.findByIdAndDelete(publicationId);

exports.edit = (publicationId, publicationData) => Publication.findByIdAndUpdate(publicationId, publicationData);

exports.shared = async (publicationId, userId) =>{
    const publication = await Publication.findById(publicationId);

    publication.usersShared.push(userId);

    await publication.save();
};

exports.getUser = (userId) => User.findById(userId).populate(['myPublication']);

// exports.getByOwner = (userId) => Course.find({owner: userId});