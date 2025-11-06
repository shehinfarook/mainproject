import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, MenuItem, Alert } from '@mui/material';
import axios from 'axios';

function AdminNotification() {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('important');
  const [target, setTarget] = useState('all');
  const [customTarget, setCustomTarget] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFeedback('');
    let finalTarget = target === 'custom' ? customTarget : target;
    if (!message || !finalTarget) {
      setError('Please enter message and target.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/admin/notification', { message, type, target: finalTarget });
      setFeedback('Notification sent successfully.');
      setMessage('');
      setType('important');
      setTarget('all');
      setCustomTarget('');
    } catch {
      setError('Failed to send notification.');
    }
  };

  return (
    <Card elevation={6} sx={{ borderRadius: 4, bgcolor: '#e0f7fa', boxShadow: 8, mb: 4 }}>
      <CardContent>
        <Typography variant="h6" mb={2} color="#00838f">Send Notification</Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField label="Message" value={message} onChange={e => setMessage(e.target.value)} multiline minRows={2} required />
          <TextField select label="Type" value={type} onChange={e => setType(e.target.value)}>
            <MenuItem value="important">Important</MenuItem>
            <MenuItem value="class">Class</MenuItem>
            <MenuItem value="payment">Payment</MenuItem>
          </TextField>
          <TextField select label="Target" value={target} onChange={e => setTarget(e.target.value)}>
            <MenuItem value="all">All Students</MenuItem>
            <MenuItem value="custom">Specific Student/User ID</MenuItem>
            <MenuItem value="batch">Batch</MenuItem>
          </TextField>
          {target === 'custom' && (
            <TextField label="User ID or Batch Code" value={customTarget} onChange={e => setCustomTarget(e.target.value)} required />
          )}
          <Button type="submit" variant="contained" color="primary" sx={{ bgcolor: '#00838f' }}>Send Notification</Button>
          {error && <Alert severity="error">{error}</Alert>}
          {feedback && <Alert severity="success">{feedback}</Alert>}
        </Box>
      </CardContent>
    </Card>
  );
}

export default AdminNotification;
