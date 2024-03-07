const Animal = require('../models/Animal');

exports.create = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find();

// // exports.getAll = () => Photo.find().populate('owner');

exports.getOne = (animalId) => Animal.findById(animalId).populate('owner');

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);

exports.donate = async (animalId, animalData) =>{
    const animal = await Animal.findById(animalId);

    animal.donations.push(animalData);
    return animal.save();
};

exports.getSearch = () => Animal.find();