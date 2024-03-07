const Hero = require('../models/Hero');

exports.create = (heroData) => Hero.create(heroData);

exports.getAll = () => Hero.find().populate('owner');

exports.getOne = (heroId) => Hero.findById(heroId).populate('owner');

exports.delete = (heroId) => Hero.findByIdAndDelete(heroId);

exports.edit = (heroId, heroData) => Hero.findByIdAndUpdate(heroId, heroData);

exports.vote = async (heroId, user) =>{
    const hero = await Hero.findById(heroId);

    hero.votes.push(user);

    return hero.save();
};

exports.getByOwner = (userId) => Hero.find({owner: userId});