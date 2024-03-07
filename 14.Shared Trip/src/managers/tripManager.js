const Trip = require('../models/Trip');
const User = require('../models/User');

exports.create = async (userId, tripData) => {
   const createdTrip = await Trip.create(tripData);

   await User.findByIdAndUpdate(userId, {$push: {tripsHistory: createdTrip._id}});
   return createdTrip;
}

exports.getAll = () => Trip.find().populate('creator');

exports.getOne = (tripId) => Trip.findById(tripId).populate('creator').populate('buddies');

exports.delete = (tripId) => Trip.findByIdAndDelete(tripId);

exports.edit = (tripId, tripData) => Trip.findByIdAndUpdate(tripId, tripData);

exports.join = async (tripId, userId) =>{
    const trip = await Trip.findById(tripId);
    const user = await User.findById(userId);

    user.tripsHistory.push(tripId);
    trip.buddies.push(userId);
    trip.seats--;

    await user.save();
    await trip.save();
};

exports.getUser = (userId) => User.findById(userId).populate(['tripsHistory']);
