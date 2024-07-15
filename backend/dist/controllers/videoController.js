"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideos = exports.deleteVideo = exports.getVideo = exports.uploadVideo = void 0;
const video_1 = __importDefault(require("../models/video"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thumbnail, customName, duration } = req.body;
    if (!req.file || !thumbnail || !customName || !duration) {
        return res.status(400).json({ err: 'Missing file, thumbnail, customName, or duration' });
    }
    try {
        const file = new video_1.default({
            name: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            thumbnail: thumbnail,
            customName: customName,
            duration: Number(duration),
        });
        yield file.save();
        res.send({ message: 'File uploaded successfully', file });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error uploading file' });
    }
});
exports.uploadVideo = uploadVideo;
const getVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = yield video_1.default.findOne({ name: req.params.filename });
        if (!file) {
            return res.status(404).send({ message: 'File not found' });
        }
        const filePath = path_1.default.join(`${__dirname}`, "../uploads", file.name);
        res.sendFile(filePath);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error retrieving file' });
    }
});
exports.getVideo = getVideo;
const deleteVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield video_1.default.findByIdAndDelete(req.params.id);
        if (!video) {
            return res.status(404).send({ message: 'Video not found' });
        }
        const filePath = path_1.default.join(__dirname, '../', video.path);
        fs_1.default.unlinkSync(filePath);
        res.send({ message: 'Video deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error deleting video' });
    }
});
exports.deleteVideo = deleteVideo;
const getVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = yield video_1.default.find();
        res.send(files);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error retrieving files' });
    }
});
exports.getVideos = getVideos;
