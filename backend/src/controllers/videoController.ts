import { Request, Response } from 'express';
import Video from '../models/video';
import path from 'path';
import fs from 'fs';

export const uploadVideo = async (req: Request, res: Response) => {
  const { thumbnail, customName, duration } = req.body;
  if (!req.file || !thumbnail || !customName || !duration) {
    return res.status(400).json({ err: 'Missing file, thumbnail, customName, or duration' });
  }

  try {
    const file = new Video({
      name: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      thumbnail: thumbnail,
      customName: customName,
      duration: Number(duration),
    });

    await file.save();
    res.send({ message: 'File uploaded successfully', file });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error uploading file' });
  }
};

export const getVideo = async (req: Request, res: Response) => {
  try {
    const file = await Video.findOne({ name: req.params.filename });

    if (!file) {
      return res.status(404).send({ message: 'File not found' });
    }

    const filePath = path.join(`${__dirname}`, "../uploads", file.name);
    res.sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error retrieving file' });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);

    if (!video) {
      return res.status(404).send({ message: 'Video not found' });
    }

    const filePath = path.join(__dirname, '../', video.path);
    fs.unlinkSync(filePath);

    res.send({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting video' });
  }
};

export const getVideos = async (req: Request, res: Response) => {
  try {
    const files = await Video.find();
    res.send(files);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error retrieving files' });
  }
};
