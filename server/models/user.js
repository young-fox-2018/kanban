const mongoose = require('mongoose'),
      bcrypt = require('bcryptjs');
require('dotenv').config();

const UserSchema = mongoose.Schema({
	username : {type:String},
	email: {
      type: String, 
      required: [true, 'What is your email?']
    },
    password: {type:String, required:[true, 'Where your password?']},
    role: {type:String}

});

UserSchema.pre('save', function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(Number(process.env.bSecret), function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
