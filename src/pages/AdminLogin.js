import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Fixed credentials
  const ADMIN_USER = 'admin';
  const ADMIN_PASS = 'admin123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setError('');
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="stretch" bgcolor="#faf7fc">
      {/* Left Side: Admin Login Form */}
      <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" px={6} py={8} bgcolor="#fff">
        <Typography variant="h4" fontWeight={700} mb={2} color="#1976d2">Admin Login</Typography>
        <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: 360 }}>
          <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" />
          <TextField 
            label="Password" 
            type={showPassword ? 'text' : 'password'} 
            fullWidth 
            margin="normal" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#1976d2', color: '#fff', fontWeight: 600, py: 1.5, fontSize: 16, borderRadius: 2, boxShadow: 2, mt: 2 }}>Login</Button>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </form>
      </Box>
      {/* Right Side: Illustration */}
      <Box flex={1} display="flex" alignItems="center" justifyContent="center" bgcolor="#1976d2">
        <Box width="80%" maxWidth={420}>
          {/* Simple SVG illustration matching login/signup style */}
          <svg viewBox="0 0 420 420" width="100%" height="320" fill="none">
            <rect x="0" y="0" width="420" height="420" rx="32" fill="#1976d2" />
            <circle cx="210" cy="210" r="90" fill="#fff" opacity="0.12" />
            <circle cx="210" cy="210" r="70" fill="#fff" opacity="0.18" />
            <ellipse cx="210" cy="320" rx="120" ry="30" fill="#fff" opacity="0.08" />
            <rect x="120" y="120" width="180" height="120" rx="32" fill="#fff" opacity="0.18" />
            <ellipse cx="210" cy="210" rx="60" ry="80" fill="#fff" opacity="0.18" />
            <circle cx="210" cy="210" r="50" fill="#fff" opacity="0.22" />
            <rect x="160" y="180" width="100" height="80" rx="24" fill="#fff" opacity="0.22" />
            <ellipse cx="210" cy="210" rx="40" ry="60" fill="#fff" opacity="0.22" />
            <circle cx="210" cy="210" r="30" fill="#fff" opacity="0.25" />
            <ellipse cx="210" cy="210" rx="20" ry="30" fill="#fff" opacity="0.25" />
            <rect x="180" y="200" width="60" height="40" rx="12" fill="#fff" opacity="0.25" />
            <ellipse cx="210" cy="210" rx="10" ry="15" fill="#fff" opacity="0.25" />
            <rect x="200" y="210" width="20" height="10" rx="4" fill="#fff" opacity="0.25" />
            {/* Abstract person illustration */}
            <ellipse cx="210" cy="270" rx="40" ry="18" fill="#fff" />
            <ellipse cx="210" cy="210" rx="32" ry="40" fill="#fff" />
            <ellipse cx="210" cy="180" rx="18" ry="24" fill="#fff" />
            <ellipse cx="210" cy="170" rx="10" ry="12" fill="#1976d2" />
            <ellipse cx="210" cy="170" rx="6" ry="8" fill="#fff" />
            <rect x="200" y="190" width="20" height="40" rx="8" fill="#fff" />
          </svg>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLogin;
