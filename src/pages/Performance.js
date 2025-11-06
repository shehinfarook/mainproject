import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Box, Grid, Avatar, Paper, Fade, Zoom } from '@mui/material';
import { CheckCircle, EmojiEvents } from '@mui/icons-material';
import PerformanceChart from '../components/PerformanceChart';

function Performance() {
  const [interns, setInterns] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).id : null;
    
    axios.get('http://localhost:5000/api/intern/all').then(res => setInterns(res.data));
    
    // Check if current user has completed weekly task
    if (userId) {
      axios.get(`http://localhost:5000/api/intern/check-task/${userId}`)
        .then(res => {
          if (res.data.taskCompleted) {
            setShowCongrats(true);
            setTimeout(() => setShowCongrats(false), 5000);
          }
        })
        .catch(() => {});
    }
  }, []);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, position: 'relative' }}>
      {showCongrats && (
        <Fade in={showCongrats}>
          <Box
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            bgcolor="rgba(0,0,0,0.8)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={9999}
          >
            <Zoom in={showCongrats}>
              <Card sx={{ p: 4, textAlign: 'center', bgcolor: '#fff', borderRadius: 4 }}>
                <EmojiEvents sx={{ fontSize: 80, color: '#ffd700', mb: 2 }} />
                <Typography variant="h3" color="#4caf50" mb={2}>Congratulations!</Typography>
                <Typography variant="h6" mb={2}>You have successfully completed your weekly task!</Typography>
                <CheckCircle sx={{ fontSize: 60, color: '#4caf50' }} />
              </Card>
            </Zoom>
          </Box>
        </Fade>
      )}
      
      <Typography variant="h4" fontWeight={700} color="#6a0dad" mb={4} align="center">Interns Performance</Typography>
      <Grid container spacing={4}>
        {interns.map(intern => (
          <Grid item xs={12} md={6} key={intern._id}>
            <Card elevation={6} sx={{ borderRadius: 4, bgcolor: '#f5f5fa', transition: 'box-shadow 0.3s', ':hover': { boxShadow: 8, bgcolor: '#e0e0ff' } }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar src={intern.profilePic} sx={{ width: 56, height: 56, mr: 2, bgcolor: '#6a0dad' }} />
                  <Box>
                    <Typography variant="h6" color="#6a0dad">{intern.name}</Typography>
                    <Typography variant="body2" color="text.secondary">Batch: {intern.batchCode}</Typography>
                    {intern.weeklyTaskCompleted && (
                      <Box display="flex" alignItems="center" mt={1}>
                        <CheckCircle sx={{ fontSize: 16, color: '#4caf50', mr: 0.5 }} />
                        <Typography fontSize={12} color="#4caf50">Weekly Task Completed</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
                <PerformanceChart data={intern} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Performance;
