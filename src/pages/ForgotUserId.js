import React, { useState } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';

function ForgotUserId() {
  const [name, setName] = useState('');
  const [batchCode, setBatchCode] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-userid', { name, batchCode });
      setUserId(res.data.userId);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to retrieve User ID.');
      setUserId('');
    }
  };

  return (
    <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: 30, width: '100%' }}>
        <Typography variant="h4" fontWeight={700} mb={2} color="#1976d2" textAlign="center">Forgot User ID</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Full Name" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} required />
          <TextField label="Batch Code" fullWidth margin="normal" value={batchCode} onChange={e => setBatchCode(e.target.value)} required />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ 
              bgcolor: '#6a0dad', 
              color: '#fff', 
              fontWeight: 600, 
              py: 1.5, 
              fontSize: 16, 
              borderRadius: 2, 
              boxShadow: 2, 
              mt: 2 
            }}
          >
            Retrieve User ID
          </Button>
        </form>
        {userId && <Typography color="primary" style={{ marginTop: 10, textAlign: 'center' }}>Your User ID: {userId}</Typography>}
        {error && <Typography color="error" style={{ marginTop: 10, textAlign: 'center' }}>{error}</Typography>}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <a href="/" style={{ color: '#6a0dad', textDecoration: 'underline' }}>Login</a>
        </div>
      </Paper>
    </Container>
  );
}

export default ForgotUserId;
