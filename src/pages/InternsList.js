import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Card, CardContent, Avatar, Grid, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

function InternsList() {
  const [interns, setInterns] = useState([]);
  const [filteredInterns, setFilteredInterns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/interns')
      .then(res => {
        setInterns(res.data);
        setFilteredInterns(res.data);
      })
      .catch(err => console.error('Failed to fetch interns'));
  }, []);

  useEffect(() => {
    const filtered = interns.filter(intern =>
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.batchCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInterns(filtered);
  }, [searchTerm, interns]);

  return (
    <Box minHeight="100vh" bgcolor="#f5f5fa" p={4}>
      <Box maxWidth="1200px" mx="auto">
        <Typography variant="h4" fontWeight={700} mb={4} color="#1976d2">Interns List</Typography>
        
        <TextField
          fullWidth
          placeholder="Search by name, user ID, or batch code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4, bgcolor: '#fff' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={3}>
          {filteredInterns.map(intern => (
            <Grid item xs={12} sm={6} md={4} key={intern._id}>
              <Card elevation={4} sx={{ borderRadius: 3, transition: 'transform 0.2s', ':hover': { transform: 'scale(1.02)' } }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar 
                      src={intern.profilePic} 
                      sx={{ width: 60, height: 60, mr: 2 }}
                    >
                      {intern.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>{intern.name}</Typography>
                      <Typography variant="body2" color="text.secondary">ID: {intern.userId}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" mb={1}>
                    <strong>Batch:</strong> {intern.batchCode}
                  </Typography>
                  <Typography variant="body2" mb={1}>
                    <strong>Email:</strong> {intern.email || 'Not provided'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong> {intern.isActive ? 'Active' : 'Inactive'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredInterns.length === 0 && (
          <Box textAlign="center" mt={4}>
            <Typography variant="h6" color="text.secondary">
              {searchTerm ? 'No interns found matching your search.' : 'No interns registered yet.'}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default InternsList;