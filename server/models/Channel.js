import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const channelSchema = mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        header: { type: String },
        avatar: { type: String },
        name: {
            type: String,
            required: true,
            unique: true
        },
        description:{ type: String },
        videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
        subscribers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    }
)

const Channel = mongoose.model('Channel', channelSchema)
export default Channel
