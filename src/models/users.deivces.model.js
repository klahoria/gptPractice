import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 1,
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
    id_deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

const UserDevices = mongoose.model('userDevices', userSchema);
export default UserDevices;
