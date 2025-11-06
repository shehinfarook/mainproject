import React from 'react';
import '../styles/GlassyBg.css';
import { Box, Typography, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText, Divider, Paper, Grid } from '@mui/material';
import AdminPDFUpload from '../components/AdminPDFUpload';
import AdminAddStudent from '../components/AdminAddStudent';
import AdminScheduleUpload from '../components/AdminScheduleUpload';
import AdminLeaveApproval from '../components/AdminLeaveApproval';
import AdminInternList from '../components/AdminInternList';
import AdminAddPayment from '../components/AdminAddPayment';
import AdminNotification from '../components/AdminNotification';
import LogoutIcon from '@mui/icons-material/Logout';

function handleLogout() {
  // Clear any admin session/token if used
  window.location.href = '/admin-login';
}

function AdminPanel() {
  return (
  <Box minHeight="100vh" display="flex" bgcolor="#f5f5fa">
      {/* Sidebar */}
      <Paper elevation={3} sx={{ width: 180, bgcolor: '#1976d2', color: '#fff', pt: 4, borderTopRightRadius: 24, borderBottomRightRadius: 24 }}>
        <List>
          <ListItem>
            <Typography variant="h5" fontWeight={700} color="#fff">Admin</Typography>
          </ListItem>
          <Divider sx={{ bgcolor: '#fff', my: 2 }} />
          <ListItem button onClick={handleLogout} sx={{ mt: 2 }}>
            <ListItemIcon><LogoutIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: '#fff', fontWeight: 600, fontSize: 16 }} />
          </ListItem>
        </List>
      </Paper>

      {/* Main Content */}
      <Box flex={1} p={6}>
        <Typography variant="h4" fontWeight={700} mb={4} color="#1976d2">Admin Panel</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={6} sx={{ borderRadius: 4, bgcolor: '#e0f7fa', boxShadow: 8, mb: 4, transition: 'box-shadow 0.3s', ':hover': { boxShadow: 16, bgcolor: '#b2ebf2' } }}>
              <CardContent>
                <Typography variant="h6" mb={2} color="#00838f">Add Student</Typography>
                <AdminAddStudent />
              </CardContent>
            </Card>
            <Card elevation={6} sx={{ borderRadius: 4, bgcolor: '#e8f5e9', boxShadow: 8, mb: 4, transition: 'box-shadow 0.3s', ':hover': { boxShadow: 16, bgcolor: '#c8e6c9' } }}>
              <CardContent>
                <Typography variant="h6" mb={2} color="#2e7d32">Upload Schedule</Typography>
                <AdminScheduleUpload />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={6} sx={{ borderRadius: 4, bgcolor: '#ffe0f7', boxShadow: 8, mb: 4, transition: 'box-shadow 0.3s', ':hover': { boxShadow: 16, bgcolor: '#ffd6e0' } }}>
              <CardContent>
                <Typography variant="h6" mb={2} color="#d72660">Upload Intern List PDF</Typography>
                <AdminPDFUpload />
              </CardContent>
            </Card>
            <Card elevation={6} sx={{ borderRadius: 4, bgcolor: '#f3e5f5', boxShadow: 8, mb: 4, transition: 'box-shadow 0.3s', ':hover': { boxShadow: 16, bgcolor: '#e1bee7' } }}>
              <CardContent>
                <Typography variant="h6" mb={2} color="#6a1b9a">Leave Approval</Typography>
                <AdminLeaveApproval />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card elevation={6} sx={{ borderRadius: 4, bgcolor: '#e8f0fe', boxShadow: 8, mb: 4, transition: 'box-shadow 0.3s', ':hover': { boxShadow: 16, bgcolor: '#d1e1fc' } }}>
              <CardContent>
                <Typography variant="h6" mb={2} color="#1e88e5">Interns Management</Typography>
                <Button 
                  variant="contained" 
                  sx={{ bgcolor: '#1e88e5', color: '#fff' }}
                  onClick={() => window.open('/interns-list', '_blank')}
                >
                  View All Interns
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={6} sx={{ borderRadius: 4, bgcolor: '#fffde7', boxShadow: 8, mb: 4 }}>
              <CardContent>
                <AdminAddPayment />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={6} sx={{ borderRadius: 4, bgcolor: '#e0f7fa', boxShadow: 8, mb: 4 }}>
              <CardContent>
                <AdminNotification />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Add more admin features here with MUI components */}
      </Box>
    </Box>
  );
}

export default AdminPanel;
