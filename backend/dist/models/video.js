"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const videoSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    thumbnail: { type: String, required: true },
    customName: { type: String, required: true },
    duration: { type: Number, required: true },
    size: Number,
});
const Video = mongoose_1.default.model('Video', videoSchema);
exports.default = Video;
