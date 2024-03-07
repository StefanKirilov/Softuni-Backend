const Electronics = require('../models/Electronics');

exports.create = (electronicsData) => Electronics.create(electronicsData);

exports.getAll = () => Electronics.find().populate('owner');

exports.getOne = (electronicsId) => Electronics.findById(electronicsId).populate('owner');

exports.delete = (electronicsId) => Electronics.findByIdAndDelete(electronicsId);

exports.edit = (electronicsId, electronicsData) => Electronics.findByIdAndUpdate(electronicsId, electronicsData);

exports.buy = async (electronicsId, userId) =>{

    const electronics = await Electronics.findById(electronicsId);
    electronics.buyingList.push(userId);
    return electronics.save();
};

exports.getSearch = () => Electronics.find();
