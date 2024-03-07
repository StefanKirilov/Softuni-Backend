const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        // unique: true,
        // minLength: [2, 'Too short name'],
    },
    lastName: {
        type: String,
        required: true,
        // minLength: [2, 'Too short passwords'],
    },
    email: {
        type: String,
        required: true,
        // minLength: [10, 'Too short email address'],
    },
    password: {
        type: String,
        required: true,
        // minLength: [10, 'Too short password'],
    },
});

userSchema.virtual('repeatPassword')
.set(function(value){
    if (this.password !== value) {
        throw new Error('Password is not the same!');
    }
});

userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;