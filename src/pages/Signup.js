import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Avatar, FormControlLabel, Checkbox } from '@mui/material';


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [agree, setAgree] = useState(false);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      if (profilePic) formData.append('profilePic', profilePic);
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess(res.data.message + ' Your User ID: ' + res.data.userId + ' (Check your email)');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed.');
      setSuccess('');
    }
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="stretch" bgcolor="#faf7fc">
      {/* Left Side: Form */}
      <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" px={6} py={8} bgcolor="#fff">
    {/* Removed logo and brand name for cleaner look */}
        <Typography variant="h4" fontWeight={700} mb={1} color="#1976d2">Create your account</Typography>
        <Typography color="text.secondary" mb={3}>Please enter your details</Typography>
        <form onSubmit={handleSignup} style={{ width: '100%', maxWidth: 360 }}>
          <TextField label="Full Name" value={name} onChange={e => setName(e.target.value)} fullWidth margin="normal" autoComplete="name" />
          <TextField label="Email address" value={email} onChange={e => setEmail(e.target.value)} fullWidth margin="normal" autoComplete="email" />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth margin="normal" autoComplete="new-password" />
          <Box mt={2} mb={2}>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{marginTop:10}} />
            {preview && <Avatar src={preview} sx={{ width: 56, height: 56, mt: 2 }} />}
          </Box>
          <FormControlLabel control={<Checkbox checked={agree} onChange={e => setAgree(e.target.checked)} />} label={<Typography fontSize={14}>I agree to the terms & conditions</Typography>} />
          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#1976d2', color: '#fff', fontWeight: 600, py: 1.5, fontSize: 16, borderRadius: 2, boxShadow: 2, mt: 2 }} disabled={!agree}>Sign up</Button>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
        </form>
        <Typography mt={2} color="text.secondary" fontSize={15}>
          Already have an account? <a href="/" style={{ color: '#1976d2', textDecoration: 'underline' }}>Login</a>
        </Typography>
      </Box>
      {/* Right Side: Illustration */}
      <Box flex={1} display="flex" alignItems="center" justifyContent="center" bgcolor="#1976d2">
        <Box width="80%" maxWidth={420}>
          {/* Simple SVG illustration matching reference */}
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

export default Signup;
