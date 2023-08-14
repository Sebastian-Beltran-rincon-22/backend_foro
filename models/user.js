const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        unique: true,
        maxLenth: 100
    },

    user_imagen:{
        type: String,
        required: false
    },
    user_email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (user_email) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: props => `${props.value} is not a valid email`
        },
        required: [true, 'user email required']
    },
    user_password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('user_password')) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.user_password, salt, function (err, hash) {
            if (err) return next(err);

            user.user_password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema)