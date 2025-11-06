import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, TextField } from '@mui/material';
import axios from 'axios';

function AdminScheduleUpload() {
  const [file, setFile] = useState(null);
  const [fromWeek, setFromWeek] = useState('');
  const [endWeek, setEndWeek] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }
    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file only.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fromWeek', fromWeek || new Date().toISOString().slice(0, 10));
    formData.append('endWeek', endWeek || new Date().toISOString().slice(0, 10));
    try {
      console.log('Uploading file:', file.name, 'Size:', file.size);
      const response = await axios.post('http://localhost:5000/api/admin/upload-schedule', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Upload response:', response.data);
      setSuccess('Schedule uploaded successfully!');
      setError('');
      setFile(null);
      setFromWeek('');
      setEndWeek('');
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || err.message || 'Upload failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <Card elevation={4} sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" mb={2} color="#8e6be6">Upload Weekly Schedule</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField 
            label="From Week" 
            type="date" 
            value={fromWeek} 
            onChange={e => setFromWeek(e.target.value)} 
            InputLabelProps={{ shrink: true }}
            size="small"
          />
          <TextField 
            label="End Week" 
            type="date" 
            value={endWeek} 
            onChange={e => setEndWeek(e.target.value)} 
            InputLabelProps={{ shrink: true }}
            size="small"
          />
          <Box>
            <Typography variant="body2" mb={1}>Select PDF file:</Typography>
            <input 
              type="file" 
              accept="application/pdf,.pdf" 
              onChange={handleFileChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </Box>
          <Button 
            variant="contained" 
            sx={{ bgcolor: '#8e6be6', color: '#fff' }} 
            onClick={handleUpload}
            disabled={!file}
          >
            Upload Schedule
          </Button>
          {success && <Typography color="success.main" sx={{ fontWeight: 600 }}>{success}</Typography>}
          {error && <Typography color="error.main" sx={{ fontWeight: 600 }}>{error}</Typography>}
        </Box>
      </CardContent>
    </Card>
  );
}
export default AdminScheduleUpload;
