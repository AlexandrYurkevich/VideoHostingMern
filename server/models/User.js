import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const userSchema = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        birthday: { type: Date, default: Date.now },
        subscribedChannels: [{ type: Schema.Types.ObjectId, ref: 'Channel' }],
        history: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
        liked: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
        disliked: [{ type: Schema.Types.ObjectId, ref: 'Video' }]
    }
)

const User = mongoose.model('User', userSchema)
export default User
