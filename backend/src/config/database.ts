import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

const MONGO_URI = "mongodb+srv://podev:podev123@cluster0.okqdh8q.mongodb.net/";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected.');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error', err);
    }
    process.exit(1);
  }
};

const conn = mongoose.connection;
let gfs: Grid.Grid;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

export { connectDB, gfs, conn, MONGO_URI };
