import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/GlassyBg.css';
// import PerformanceChart from '../components/PerformanceChart';
import PaymentHistory from '../components/PaymentHistory';
import LeaveForm from '../components/LeaveForm';
import Notifications from '../components/Notifications';
import ScheduleViewer from '../components/ScheduleViewer';
import { Container, Card, CardContent, Typography, Avatar, Grid, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Paper, IconButton } from '@mui/material';
import { GraduationCapIcon, PaymentIcon, CourseIcon, InstructorIcon } from '../components/CustomIcons';
// Removed duplicate import of ChatBox
import YourAIChatBox from '../components/ChatBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';


function Dashboard() {
  const [intern, setIntern] = useState(null);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = token ? JSON.parse(atob(token.split('.')[1])).id : null;
    if (id) {
      axios.get(`http://localhost:5000/api/intern/dashboard/${id}`).then(res => setIntern(res.data));
    }
  }, []);
  if (!intern) return <div>Loading...</div>;


  return (
    <div style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7f4 100%)', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ mt: 0, p: 0 }}>
        <Box display="flex" minHeight="100vh" sx={{ position: 'relative', overflow: 'hidden' }}>
          {/* Sidebar Navigation */}
          <Paper elevation={8} sx={{ width: 200, bgcolor: 'rgba(25, 118, 210, 0.75)', color: '#fff', pt: 4, borderTopRightRadius: 24, borderBottomRightRadius: 24, backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.37)', transition: 'background 0.3s', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
              <Avatar src={typeof intern.profilePic === 'string' ? intern.profilePic : ''} sx={{ width: 56, height: 56, mb: 1, boxShadow: '0 4px 16px rgba(25, 118, 210, 0.2)' }} />
              <Typography variant="h6" fontWeight={700} sx={{ color: '#fff', textShadow: '0 2px 8px #1976d2', textAlign: 'center', maxWidth: 180, overflowWrap: 'break-word' }}>{intern.name}</Typography>
            </Box>
            <Divider sx={{ bgcolor: '#fff', mb: 2, width: '80%' }} />
            <List sx={{ width: '100%' }}>
              <ListItem button component="a" href="/dashboard" sx={{ transition: 'background 0.3s', ':hover': { bgcolor: 'rgba(255,255,255,0.18)' }, borderRadius: 2 }}>
                <ListItemIcon><GraduationCapIcon /></ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ color: '#fff', fontSize: 16 }} />
              </ListItem>
              <ListItem button component="a" href="/performance" sx={{ transition: 'background 0.3s', ':hover': { bgcolor: 'rgba(255,255,255,0.18)' }, borderRadius: 2 }}>
                <ListItemIcon><AccountCircleIcon sx={{ color: '#fff' }} /></ListItemIcon>
                <ListItemText primary="Performance" sx={{ color: '#fff', fontSize: 16 }} />
              </ListItem>
              <ListItem button onClick={() => navigate('/payments')} sx={{ transition: 'background 0.3s', ':hover': { bgcolor: 'rgba(255,255,255,0.18)' }, borderRadius: 2 }}>
                <ListItemIcon><PaymentIcon /></ListItemIcon>
                <ListItemText primary="Payments" sx={{ color: '#fff', fontSize: 16 }} />
              </ListItem>
              <ListItem button component="a" href="/leave" sx={{ transition: 'background 0.3s', ':hover': { bgcolor: 'rgba(255,255,255,0.18)' }, borderRadius: 2 }}>
                <ListItemIcon><EventAvailableIcon sx={{ color: '#fff' }} /></ListItemIcon>
                <ListItemText primary="Leave" sx={{ color: '#fff', fontSize: 16 }} />
              </ListItem>
              <ListItem button component="a" href="/notifications" sx={{ transition: 'background 0.3s', ':hover': { bgcolor: 'rgba(255,255,255,0.18)' }, borderRadius: 2 }}>
                <ListItemIcon><NotificationsIcon sx={{ color: '#fff' }} /></ListItemIcon>
                <ListItemText primary="Notifications" sx={{ color: '#fff', fontSize: 16 }} />
              </ListItem>
              <ListItem button onClick={() => navigate('/settings', { state: { intern } })} sx={{ transition: 'background 0.3s', ':hover': { bgcolor: 'rgba(255,255,255,0.18)' }, borderRadius: 2 }}>
                <ListItemIcon><SettingsIcon sx={{ color: '#fff' }} /></ListItemIcon>
                <ListItemText primary="Settings" sx={{ color: '#fff', fontSize: 16 }} />
              </ListItem>
              <ListItem button onClick={handleLogout} sx={{ transition: 'background 0.3s', ':hover': { bgcolor: 'rgba(255,255,255,0.18)' }, borderRadius: 2 }}>
                <ListItemIcon><LogoutIcon sx={{ color: '#fff' }} /></ListItemIcon>
                <ListItemText primary="Logout" sx={{ color: '#fff', fontSize: 16 }} />
              </ListItem>
            </List>
          </Paper>

          {/* Main Content */}
          <Box flex={1} p={0} sx={{
            background: 'linear-gradient(120deg, #f8fafc 0%, #e0c3fc 100%)',
            position: 'relative',
            zIndex: 2
          }}>
            {/* Top Bar with Chat Assistant, Schedule, and Notifications */}
            <Box display="flex" alignItems="center" justifyContent="space-between" px={4} py={2} sx={{
              bgcolor: 'rgba(255,255,255,0.35)',
              boxShadow: '0 4px 24px rgba(25, 118, 210, 0.12)',
              borderRadius: 6,
              mb: 2,
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(25, 118, 210, 0.22)',
              zIndex: 3
            }}>
              <Box display="flex" alignItems="center">
                <Avatar src={typeof intern.profilePic === 'string' ? intern.profilePic : ''} sx={{ width: 44, height: 44, mr: 2, boxShadow: '0 4px 16px rgba(25, 118, 210, 0.2)' }} />
                <Typography variant="h6" fontWeight={600} sx={{ color: '#1976d2', textShadow: '0 2px 8px #fff' }}>Welcome, {intern.name}</Typography>
              </Box>
              <Box>
                <Typography variant="body1" color="text.secondary">Batch: {intern.batchCode || 'N/A'}</Typography>
              </Box>
              {/* SoftrAI popup button (moved out of top bar) */}
            </Box>

            {/* Schedule and Notifications at Top */}
            <Grid container spacing={4} px={4} py={2} sx={{ zIndex: 3 }}>
              <Grid item xs={12} md={6}>
                <Card elevation={12} sx={{ borderRadius: 6, bgcolor: 'rgba(225,245,254,0.7)', boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.37)', backdropFilter: 'blur(8px)', mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" color="#039be5">Schedule</Typography>
                    <ScheduleViewer intern={intern} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={12} sx={{ borderRadius: 6, bgcolor: 'rgba(255,253,231,0.7)', boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.37)', backdropFilter: 'blur(8px)', mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" color="#fbc02d">Daily Notice</Typography>
                    <Notifications internId={intern._id} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Main Cards Section */}
            <Grid container spacing={4} px={4} py={2}>
              <Grid item xs={12} md={6}>
                <Card elevation={6} sx={{ borderRadius: 6, bgcolor: 'rgba(255,224,247,0.7)', boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.37)', backdropFilter: 'blur(8px)', mb: 3, transition: 'box-shadow 0.5s, transform 0.5s', ':hover': { boxShadow: 24, transform: 'scale(1.03)', bgcolor: 'rgba(255,224,247,0.9)' } }}>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <PaymentIcon />
                      <Box ml={2}>
                        <Typography variant="h6" color="#d72660">Payments</Typography>
                        <Typography variant="body2">Total Paid: ₹{(intern.payments || []).filter(p => p.status === 'paid').reduce((a, b) => a + (b.amount || 0), 0)}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={6} sx={{ borderRadius: 6, bgcolor: 'rgba(224,247,250,0.7)', boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.37)', backdropFilter: 'blur(8px)', mb: 3, transition: 'box-shadow 0.5s, transform 0.5s', ':hover': { boxShadow: 24, transform: 'scale(1.03)', bgcolor: 'rgba(224,247,250,0.9)' } }}>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <CourseIcon />
                      <Box ml={2}>
                        <Typography variant="h6" color="#00838f">Courses</Typography>
                        <Typography variant="body2">{intern.batchCode ? intern.batchCode.split('_')[0] : 'No Course'}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={6} sx={{ borderRadius: 6, bgcolor: 'rgba(224,224,255,0.7)', boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.37)', backdropFilter: 'blur(8px)', mb: 3, transition: 'box-shadow 0.5s, transform 0.5s', ':hover': { boxShadow: 24, transform: 'scale(1.03)', bgcolor: 'rgba(224,224,255,0.9)' } }}>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <InstructorIcon />
                      <Box ml={2}>
                        <Typography variant="h6" color="#5e35b1">Staff</Typography>
                        <Box display="flex" mt={1}>
                          {(intern.staff || []).map((staff, idx) => (
                            <Avatar key={idx} src={staff.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={6} sx={{ borderRadius: 6, bgcolor: 'rgba(232,245,233,0.7)', boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.37)', backdropFilter: 'blur(8px)', mb: 3, transition: 'box-shadow 0.5s, transform 0.5s', ':hover': { boxShadow: 24, transform: 'scale(1.03)', bgcolor: 'rgba(232,245,233,0.9)' } }}>
                  <CardContent>
                    <Typography variant="h6" color="#388e3c">Payment History</Typography>
                    <PaymentHistory payments={intern.payments || intern.paymentHistory} intern={intern} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={6} sx={{ borderRadius: 6, bgcolor: 'rgba(243,229,245,0.7)', boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.37)', backdropFilter: 'blur(8px)', mb: 3, transition: 'box-shadow 0.5s, transform 0.5s', ':hover': { boxShadow: 24, transform: 'scale(1.03)', bgcolor: 'rgba(243,229,245,0.9)' } }}>
                  <CardContent>
                    <Typography variant="h6" color="#8e24aa">Leave Application</Typography>
                    <LeaveForm internId={intern._id} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <YourAIChatBox />
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Dashboard;
