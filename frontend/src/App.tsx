import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';
import VideoList from './components/VideoList';
import VideoUpload from './components/VideoUpload';
import VideoPlayer from './components/VideoPlayer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/video/:filename" element={<VideoPlayer />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
