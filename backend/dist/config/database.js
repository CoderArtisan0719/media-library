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
exports.MONGO_URI = exports.conn = exports.gfs = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const gridfs_stream_1 = __importDefault(require("gridfs-stream"));
const MONGO_URI = "mongodb+srv://podev:podev123@cluster0.okqdh8q.mongodb.net/";
exports.MONGO_URI = MONGO_URI;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        console.log('MongoDB connected.');
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
        else {
            console.error('Unknown error', err);
        }
        process.exit(1);
    }
});
exports.connectDB = connectDB;
const conn = mongoose_1.default.connection;
exports.conn = conn;
let gfs;
exports.gfs = gfs;
conn.once('open', () => {
    exports.gfs = gfs = (0, gridfs_stream_1.default)(conn.db, mongoose_1.default.mongo);
    gfs.collection('uploads');
});
