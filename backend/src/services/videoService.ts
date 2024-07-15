const getVideos = async () => {
  const response = await fetch('/api/videos');
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  return response.json();
};

const uploadVideo = (file: File, onProgress: (progress: number) => void) => {
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

export default { getVideos, uploadVideo };
