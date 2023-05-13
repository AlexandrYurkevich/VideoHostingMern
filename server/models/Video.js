import mongoose from 'mongoose'

const VideoSchema = mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel'
    },
    title: { type: String },
    description: { type: String },
    videoUrl: { type: String },
    thumbnail: { type: String },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
  },
  { timestamps: true }
);
  
const Video = mongoose.model('Video', VideoSchema);
export default Video
