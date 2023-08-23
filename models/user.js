// Import the mongoose library and bcrypt for password hashing
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Define a new Schema called 'userSchema'
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        maxLength: 100
    },
    userImg: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: props => `${props.value} is not a valid email`
        },
        required: [true, 'user email required']
    },
    password: {
        type: String,
        required: true
    },
    admin: [{
        ref: "Admin",
        type: mongoose.Schema.Types.ObjectId
    }]
}, {
    versionKey: false,
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Define a static method 'encryptPassword' on the schema to hash passwords
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Define a static method 'comparePassword' on the schema to compare passwords
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

// Use a pre-save hook to hash the password before saving it to the database
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

// Create a Mongoose model named 'User' with the 'userSchema' schema
module.exports = mongoose.model('User', userSchema);
