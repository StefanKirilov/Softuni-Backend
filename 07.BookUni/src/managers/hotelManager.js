const Hotel = require('../models/Hotel');

exports.create = (hotelData) => Hotel.create(hotelData);

exports.getAll = () => Hotel.find().populate('owner');

exports.getOne = (hotelId) => Hotel.findById(hotelId).populate('owner');

exports.delete = (hotelId) => Hotel.findByIdAndDelete(hotelId);

exports.edit = (hotelId, hotelData) => Hotel.findByIdAndUpdate(hotelId, hotelData);

exports.booking = async (hotelId, userId) =>{
    const hotel = await Hotel.findById(hotelId);
    const user = await Hotel.findById(userId);

    hotel.usersBooked.push(userId);
    user.bookedHotels.push(hotelId);

    hotel.freeRooms--;
    
    await hotel.save();
    await user.save();

    return;
};

// exports.getByOwner = (userId) => Hotel.find({owner: userId});