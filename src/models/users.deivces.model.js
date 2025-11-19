import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    auth_token: {
        type: String,
        required: 1
    },
    refresh_token: {
        type: String,
        required: 1
    },
    logout_at: {
        type: Date,
        default: null
    },
    is_deleted: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

const userDevices = mongoose.model('userDevices', userSchema);
export default userDevices;
