import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, CircularProgress, Typography, Snackbar, Grid, IconButton, Box, useTheme, Alert, Avatar, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import videoService from '../services/videoService';

const VideoUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});
  const [summaries, setSummaries] = useState<{ [key: string]: string }>({});
  const [durations, setDurations] = useState<{ [key: string]: number }>({});
  const [successAlert, setSuccessAlert] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [cancelAlert, setCancelAlert] = useState<boolean>(false);
  const abortControllers = useRef<{ [key: string]: AbortController }>({});
  const theme = useTheme();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
    acceptedFiles.forEach((file) => captureThumbnailAndDuration(file));
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mkv', '.avi', '.mov', '.wmv']
    }
  });

  const handleUpload = (file: File) => {
    const thumbnail = thumbnails[file.name];
    const customName = summaries[file.name];
    const duration = durations[file.name];

    const controller = new AbortController();
    abortControllers.current[file.name] = controller;

    videoService.uploadVideo(file, (progress) => {
      setProgress((prevProgress) => ({ ...prevProgress, [file.name]: progress }));
    }, thumbnail, customName, duration, controller.signal).then(() => {
      setSuccessAlert(true);
      setTimeout(() => {
        setProgress((prevProgress) => ({ ...prevProgress, [file.name]: 100 }));
      }, 2000);
      setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
    }).catch((error) => {
      if (error.name === 'AbortError') {
        setCancelAlert(true);
        console.log('Upload cancelled');
      } else {
        console.error('Error uploading video:', error);
        setErrorAlert('Error uploading video.');
      }
    });
  };

  const handleCancel = (fileName: string) => {
    if (abortControllers.current[fileName]) {
      abortControllers.current[fileName].abort();
    }
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handlecustomNameChange = (fileName: string, value: string) => {
    setSummaries((prevSummaries) => ({ ...prevSummaries, [fileName]: value }));
  };

  const captureThumbnailAndDuration = (videoFile: File) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(videoFile);

    video.addEventListener('loadeddata', () => {
      setDurations((prevDurations) => ({ ...prevDurations, [videoFile.name]: video.duration }));
      video.currentTime = 0;

      video.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnailURL = canvas.toDataURL('image/png');
          setThumbnails((prevThumbnails) => ({ ...prevThumbnails, [videoFile.name]: thumbnailURL }));
        }
        URL.revokeObjectURL(video.src);
      }, { once: true });
    });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{marginTop: '100px', marginBottom: '100px'}}>Upload Video</Typography>
      <div {...getRootProps()} style={{ border: '1px dashed grey', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <Typography variant="h6">Drag and drop video files here</Typography>
        <Typography variant="body1">or</Typography>
        <Button
          style={{
              borderRadius: 35,
              backgroundColor: "#24252a",
              padding: "18px 36px",
              fontSize: "18px"
          }}
            variant="contained"
        >
          Browse files
        </Button>
      </div>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {files.map((file) => (
          <Grid item xs={12} key={file.name}>
            <Box display="flex" alignItems="center" position="relative">
              <Avatar src={thumbnails[file.name]} style={{ marginRight: '10px' }} />
              <Box display="flex" flexDirection="column" flexGrow={1}>
                <Typography variant="body1" noWrap>{file.name}</Typography>
                <Typography variant="body2">{(file.size / 1024).toFixed(2)} KB</Typography>
                <TextField
                  label="customName"
                  value={summaries[file.name] || ''}
                  onChange={(e) => handlecustomNameChange(file.name, e.target.value)}
                  variant="outlined"
                  size="small"
                  style={{ marginTop: '10px' }}
                />
              </Box>
              {progress[file.name] !== undefined ? (
                <Box display="flex" alignItems="center" marginLeft="10px" position="relative">
                  <CircularProgress
                    variant="determinate"
                    value={progress[file.name]}
                    size={54}
                    thickness={4}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}
                  >
                    {`${Math.round(progress[file.name])}%`}
                  </Typography>
                </Box>
              ) : (
                <IconButton onClick={() => handleUpload(file)} color="primary">
                  <CheckCircleIcon />
                </IconButton>
              )}
              <IconButton onClick={() => handleCancel(file.name)} color="secondary">
                <CancelIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={successAlert}
        autoHideDuration={6000}
        onClose={() => setSuccessAlert(false)}
      >
        <Alert onClose={() => setSuccessAlert(false)} severity="success" sx={{ width: '100%', backgroundColor: theme.palette.primary.main, color: 'white' }}>
          Upload successful
        </Alert>
      </Snackbar>
      <Snackbar
        open={cancelAlert}
        autoHideDuration={6000}
        onClose={() => setCancelAlert(false)}
      >
        <Alert onClose={() => setCancelAlert(false)} severity="warning" sx={{ width: '100%' }}>
          Upload cancelled
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorAlert}
        autoHideDuration={6000}
        onClose={() => setErrorAlert(null)}
      >
        <Alert onClose={() => setErrorAlert(null)} severity="error" sx={{ width: '100%' }}>
          {errorAlert}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default VideoUpload;
