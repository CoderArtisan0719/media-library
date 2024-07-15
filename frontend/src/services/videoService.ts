import axiosInstance from '../config/axios';

const getVideos = async () => {
  try {
    const response = await axiosInstance.get('/videos');
    return response.data;
  } catch (e) {
    console.log('Error fetching files');
  }
};

const uploadVideo = async (file: File, onProgress: (progress: number) => void, thumbnail: string, customName: string, duration: number, signal: AbortSignal) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('thumbnail', thumbnail);
  formData.append('customName', customName);
  formData.append('duration', duration.toString());

  try {
    await axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (event) => {
        if (event.lengthComputable) {
          const total = event.total ?? 1;
          const progress = Math.round((event.loaded / total) * 100);
          onProgress(progress);
        }
      },
      signal,
    });
    console.log('File uploaded successfully');
  } catch (error) {
      console.error('Error uploading file', error);
      throw error;
  }
};

const deleteVideo = async (videoId: string) => {
  try {
    await axiosInstance.delete(`/video/${videoId}`);
    console.log('Video deleted successfully');
  } catch (error) {
    console.error('Error deleting video', error);
  }
};

const onGetVideo = async (filename: string) => {
  try {
    const response = await axiosInstance.get(`/video/${filename}`, {
      responseType: 'blob',
    });

    const videoBlob = new Blob([response.data], { type: response.data.type });
    const videoUrl = URL.createObjectURL(videoBlob);
    return { videoBlob, videoUrl };
  } catch (error) {
    console.error('Error loading video', error);
  }
};

export default { getVideos, uploadVideo, deleteVideo, onGetVideo };
