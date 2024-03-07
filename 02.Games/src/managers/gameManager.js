const Game = require('../models/Game');

exports.create = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find();

// exports.getAll = () => Photo.find().populate('owner');

exports.getOne = (gameId) => Game.findById(gameId).populate('owner');

exports.delete = (gameId) => Game.findByIdAndDelete(gameId);

exports.edit = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData);

exports.buyGame = async (gameId, buyData) =>{
    const game = await Game.findById(gameId);

    game.boughtBy.push(buyData);
    return game.save();
};

exports.getSearch = () => Game.find();