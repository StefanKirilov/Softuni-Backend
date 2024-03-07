const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // unique: true,
        minLength: [5, 'Too short name'],
    },
    email: {
        type: String,
        required: true,
        minLength: [10, 'Too short email address'],
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'Too short passwords'],
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