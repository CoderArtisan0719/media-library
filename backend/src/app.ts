import express from 'express';
import { connectDB } from './config/database';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import videoRoutes from './routes/videoRoutes';

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

connectDB();

app.use('/api', videoRoutes);

export default app;
