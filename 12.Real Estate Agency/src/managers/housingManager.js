const Housing = require('../models/Housing');

exports.create = (houseData) => Housing.create(houseData);

exports.getAll = () => Housing.find().populate('owner');

exports.getOne = (houseId) => Housing.findById(houseId).populate('owner').populate('rented');

exports.delete = (houseId) => Housing.findByIdAndDelete(houseId);

exports.edit = (houseId, houseData) => Housing.findByIdAndUpdate(houseId, houseData);

exports.rent = async (houseId, userId) =>{
    const house = await Housing.findById(houseId);
    house.pieces--;
    house.rented.push(userId);
    return house.save();
};

exports.getSearch = () => Housing.find();

// exports.getByOwner = (userId) => Photo.find({owner: userId});

