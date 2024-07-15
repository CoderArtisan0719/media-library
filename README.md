# Media Library

## Overview
The Media Library project is a full-stack application built using Node.js, TypeScript, React, and MongoDB. It allows users to upload, list, view, and delete videos. The project also includes support for displaying upload progress and allows navigation during uploads. The app can be extended to run on iOS and Android using Capacitor.

## Features
- List and view named videos
- Upload videos with progress indication
- Navigate to the list and view other videos while uploading
- Stretch goal: Support for iOS and Android using Capacitor
- Comprehensive tests and linting

## Technologies Used
### Frontend
- React
- TypeScript
- Material-UI
- Axios
- React Dropzone
- Capacitor (for mobile support)

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Multer (for file uploads)

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance

## Getting Started

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/CoderArtisan0719/media-library
   cd media-library
2. Install dependencies:
   ```bash
   npm install
   npm run install:all
3. Set up the MongoDB connection:
   ```bash
   Update the MongoDB URI in backend/src/config/database.ts with your MongoDB connection string.
4. Build the Project:
   ```bash
   npm run build
5. Run the Project:
   ```bash
   npm start
6. Open the application in your browser:
   ```bash
   http://localhost:3000

### Running on Mobile with Capacitor
1. Add the platforms:
   ```bash
   npx cap add ios
   npx cap add android
2. Build the frontend and copy assets:
   ```bash
   cd frontend
   npm run build
   cd ..
   npx cap copy
3. Open the platform-specific IDE:
   ```bash
   npx cap open iso
   npx cap open android
4. Run the project from Xcode or Android Studio

## Project Structure
```
media-library/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   └── videoController.ts
│   │   ├── middleware/
│   │   │   └── upload.ts
│   │   ├── models/
│   │   │   └── video.ts
│   │   ├── routes/
│   │   │   └── videoRoutes.ts
│   │   ├── services/
│   │   │   └── videoService.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .eslintrc.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VideoList.tsx
│   │   │   ├── VideoPlayer.tsx
│   │   │   └── VideoUpload.tsx
│   │   ├── services/
│   │   │   └── videoService.ts
│   │   ├── config/
│   │   │   └── axios.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── .eslintrc.json
├── capacitor.config.ts
├── package.json
├── tsconfig.json
└── README.md

```

## API Endpoints

### Video Endpoints
- `POST /api/upload` - Upload a video
- `GET /api/video/:filename` - Retrieve a specific video
- `DELET /api/video/:id` - Delete a video
- `GET /api/videos` - Retrieve all videos

## Linting and Testing

### Linting

To lint the project run:
   ```bash
   npx cap add ios
   npx cap add android
   ```

### Testing

To run the tests, run:
   ```bash
   npm test
   ```

## Notes

- Ensure MongoDB is running before starting the backend server.
- Update the MongoDB connection string in `backend/src/config/database.ts`
- For mobile support, follow the Capacitor setup instructions.