import React, { useState } from 'react';
import { Avatar, Button } from '@mui/material';
import axios from 'axios';

function ProfilePicUpload({ internId, currentPic, onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(currentPic || '');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('internId', internId);
    try {
      const res = await axios.post('http://localhost:5000/api/intern/upload-profile-pic', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Profile picture updated!');
      if (onUpload) onUpload(res.data.url);
    } catch (err) {
      setMessage('Upload failed.');
    }
  };

  return (
    <div style={{margin:'20px 0'}}>
      <Avatar src={preview} sx={{ width: 80, height: 80 }} />
      <input type="file" accept="image/*" onChange={handleFileChange} style={{marginTop:10}} />
      <Button variant="contained" color="primary" onClick={handleUpload} style={{marginLeft:10}}>Upload</Button>
      {message && <div style={{color:'green',marginTop:10}}>{message}</div>}
    </div>
  );
}
export default ProfilePicUpload;
