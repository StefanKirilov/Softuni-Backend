const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/[A-Za-z]+\s[A-Za-z]+/,'Invalid url'],
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [6, 'Minimum length'],
    },
    password: {
        type: String,
        required: true,
        min: [4, 'The password should be at least 4 characters long'],
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