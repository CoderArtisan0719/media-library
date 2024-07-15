import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Box, useTheme, CircularProgress } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import videoService from '../services/videoService';

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const videoList = await videoService.getVideos();
      setVideos(videoList);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDelete = async (videoId: string) => {
    try {
      await videoService.deleteVideo(videoId);
      setVideos(videos.filter((video) => video._id !== videoId));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant="h4" gutterBottom style={{margin: '100px 0'}}>
        Video List
      </Typography>
      <Grid container spacing={5}>
        {videos?.map((video) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
            <Card
              onMouseEnter={() => setHoveredVideo(video._id)}
              onMouseLeave={() => setHoveredVideo(null)}
              sx={{
                position: 'relative',
                transition: 'transform 0.3s, background-color 0.3s, border-bottom 0.3s',
                transform: hoveredVideo === video._id ? 'scale(1.05)' : 'scale(1)',
                backgroundColor: hoveredVideo === video._id ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                borderBottom: hoveredVideo === video._id ? `4px solid ${theme.palette.primary.main}` : 'none',
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={video.thumbnail}
                alt={video.name}
                sx={{
                  transition: 'filter 0.3s',
                  filter: hoveredVideo === video._id ? 'brightness(0.8)' : 'brightness(1)',
                }}
              />
              {hoveredVideo === video._id && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '50%',
                    padding: '10px',
                  }}
                >
                  <IconButton component={Link} to={`/video/${video.name}`} sx={{ color: 'white' }}>
                    <PlayArrowIcon fontSize="large" />
                  </IconButton>
                </Box>
              )}
              <CardContent>
                <Box style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {video.customName === "undefined" ? video.name : video.customName}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`Duration: ${Math.floor(video.duration / 60)}:${('0' + Math.floor(video.duration % 60)).slice(-2)}`}<br />
                  {`Uploaded: ${new Date(video.uploadDate).toLocaleDateString()}`}<br />
                </Typography>
              </CardContent>
              <IconButton
                size="small"
                color="secondary"
                onClick={() => handleDelete(video._id)}
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  transition: 'transform 0.2s',
                  ':active': {
                    transform: 'scale(0.9)',
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VideoList;
