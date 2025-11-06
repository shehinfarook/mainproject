import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import axios from 'axios';

function AdminPDFUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:5000/api/admin/upload-interns', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Intern list uploaded and processed!');
    } catch (err) {
      setMessage('Upload failed.');
    }
  };

  return (
    <div style={{margin:'20px 0'}}>
      <Typography variant="h6">Upload Intern List PDF</Typography>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload} style={{marginLeft:10}}>Upload</Button>
      {message && <Typography color="secondary">{message}</Typography>}
    </div>
  );
}
export default AdminPDFUpload;
