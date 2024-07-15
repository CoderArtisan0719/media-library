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
Object.defineProperty(exports, "__esModule", { value: true });
const getVideos = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('/api/videos');
    if (!response.ok) {
        throw new Error('Failed to fetch videos');
    }
    return response.json();
});
const uploadVideo = (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);
    xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            onProgress(progress);
        }
    };
    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log('File uploaded successfully');
        }
    };
    xhr.send(formData);
};
exports.default = { getVideos, uploadVideo };
