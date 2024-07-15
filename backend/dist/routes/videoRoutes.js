"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const videoController_1 = require("../controllers/videoController");
const upload_1 = __importDefault(require("../middleware/upload"));
const router = (0, express_1.Router)();
router.post('/upload', upload_1.default.single('file'), videoController_1.uploadVideo);
router.get('/video/:filename', videoController_1.getVideo);
router.delete('/video/:id', videoController_1.deleteVideo);
router.get('/videos', videoController_1.getVideos);
exports.default = router;
