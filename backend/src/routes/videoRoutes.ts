import { Router } from 'express';
import { uploadVideo, getVideo, deleteVideo, getVideos } from '../controllers/videoController';
import upload from '../middleware/upload';

const router = Router();

router.post('/upload', upload.single('file'), uploadVideo);
router.get('/video/:filename', getVideo);
router.delete('/video/:id', deleteVideo);
router.get('/videos', getVideos);

export default router;
