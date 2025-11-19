import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        match: /^[a-zA-Z0-9]+$/,  // equivalent to .alphanum()
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        match: /^[a-zA-Z0-9]{3,30}$/
    },

    birth_year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear() - 10
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.(com|net)$/ // equivalent to Joi .email({tlds:...})
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err)
    }

})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;
