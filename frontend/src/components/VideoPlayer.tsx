import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, CircularProgress, Paper, Card, CardMedia } from '@mui/material';
import { useParams } from 'react-router-dom';
import videoService from '../services/videoService';

const VideoPlayer: React.FC = () => {
  const { filename } = useParams<{ filename: string }>();
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const fetchVideo = useCallback(async () => {
    if (filename) {
      try {
        const res = await videoService.onGetVideo(filename);
        if (res?.videoUrl) {
          setVideoUrl(res.videoUrl);
        } else {
          setError('Video URL not found');
        }
      } catch (err) {
        setError('Error loading video');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Filename is missing');
      setLoading(false);
    }
  }, [filename]);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4}>
      <Paper elevation={3} sx={{ padding: 2, width: '100%', maxWidth: '800px' }}>
        <Typography variant="h4" gutterBottom>Video Player</Typography>
        <Box display="flex" justifyContent="center">
          {videoUrl && (
            <Card>
              <CardMedia
                component="video"
                controls
                src={videoUrl}
                title="Video Player"
                autoPlay
                onCanPlay={() => setIsVideoLoaded(true)}
                style={{ display: isVideoLoaded ? 'block' : 'none' }}
              >
                Your browser does not support the video tag.
              </CardMedia>
            </Card>
          )}
          {!isVideoLoaded && (
            <CircularProgress />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default VideoPlayer;
