import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  thumbnail: { type: String, required: true },
  customName: { type: String, required: true },
  duration: { type: Number, required: true },
  size: Number,
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
