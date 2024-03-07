const Post = require('../models/Post');
const User = require('../models/User');

exports.create = async (userId, postData) => {
   const createdPost = await Post.create(postData);

   await User.findByIdAndUpdate(userId, {$push: {myPosts: createdPost._id}});
   return createdPost;
}

exports.getAll = () => Post.find().populate('author');

exports.getOne = (postId) => Post.findById(postId).populate('author').populate('votes');

exports.delete = (postId) => Post.findByIdAndDelete(postId);

exports.edit = (postId, postData) => Post.findByIdAndUpdate(postId, postData);

exports.up = async (postId, userId) =>{
    const post = await Post.findById(postId);

    post.votes.push(userId);
    post.rating++;

    await post.save();
};

exports.down = async (postId, userId) =>{
   const post = await Post.findById(postId);

   post.votes.push(userId);
   post.rating--;

   await post.save();
};

exports.getUser = (userId) => User.findById(userId).populate(['myPosts']);
