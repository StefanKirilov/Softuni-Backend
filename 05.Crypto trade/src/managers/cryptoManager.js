const Crypto = require('../models/Crypto');

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.getAll = () => Crypto.find().populate('owner');

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).populate('owner');

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData);

exports.buyGame = async (cryptoId, user) =>{
    const crypto = await Crypto.findById(cryptoId);

    crypto.buy.push(user);
    return crypto.save();
};

exports.getSearch = () => Crypto.find();

// exports.getByOwner = (userId) => Photo.find({owner: userId});

