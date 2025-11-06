import React, { useState } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';

function Forgot() {
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { userId, newPassword });
      setMessage(res.data.message);
      setError('');
    } catch (err) {
      setError(err.response.data.error);
      setMessage('');
    }
  };

  return (
    <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: 30, width: '100%' }}>
        <Typography variant="h4" fontWeight={700} mb={2} color="#1976d2" textAlign="center">Forgot Password</Typography>
        <form onSubmit={handleForgot}>
          <TextField 
            label="User ID" 
            value={userId} 
            onChange={e => setUserId(e.target.value)} 
            fullWidth 
            margin="normal" 
            required
          />
          <TextField 
            label="New Password" 
            type="password" 
            value={newPassword} 
            onChange={e => setNewPassword(e.target.value)} 
            fullWidth 
            margin="normal" 
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ 
              bgcolor: '#1976d2', 
              color: '#fff', 
              fontWeight: 600, 
              py: 1.5, 
              fontSize: 16, 
              borderRadius: 2, 
              boxShadow: 2, 
              mt: 2 
            }}
          >
            Reset Password
          </Button>
        </form>
        {error && <Typography color="error" style={{ marginTop: 10, textAlign: 'center' }}>{error}</Typography>}
        {message && <Typography color="primary" style={{ marginTop: 10, textAlign: 'center' }}>{message}</Typography>}
        <Box textAlign="center" mt={2}>
          <a href="/" style={{ color: '#1976d2', textDecoration: 'underline' }}>Login</a>
        </Box>
      </Paper>
    </Container>
  );
}

export default Forgot;
