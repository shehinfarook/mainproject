import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Chip, IconButton, Collapse } from '@mui/material';
import { NotificationsActive, School, Payment, Info, ExpandMore, ExpandLess } from '@mui/icons-material';
import axios from 'axios';

function Notifications({ internId }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notification/${internId || 'all'}`);
        setNotifications(res.data);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
      setLoading(false);
    };
    fetchNotifications();
  }, [internId]);
  
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'payment': return <Payment sx={{ color: '#ff9800' }} />;
      case 'class': return <School sx={{ color: '#2196f3' }} />;
      case 'important': return <NotificationsActive sx={{ color: '#f44336' }} />;
      default: return <Info sx={{ color: '#4caf50' }} />;
    }
  };
  
  const getNotificationColor = (type) => {
    switch(type) {
      case 'payment': return '#fff3e0';
      case 'class': return '#e3f2fd';
      case 'important': return '#ffebee';
      default: return '#e8f5e8';
    }
  };
  
  if (loading) {
    return <Typography color="text.secondary">Loading notifications...</Typography>;
  }
  
  if (!notifications || notifications.length === 0) {
    return (
      <Card sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5' }}>
        <NotificationsActive sx={{ fontSize: 40, color: '#ccc', mb: 1 }} />
        <Typography color="text.secondary">No notifications yet</Typography>
      </Card>
    );
  }
  
  const displayNotifications = expanded ? notifications : notifications.slice(0, 2);
  
  return (
    <Box>
      {displayNotifications.map((notification, i) => (
        <Card 
          key={i} 
          sx={{ 
            mb: 1, 
            bgcolor: getNotificationColor(notification.type),
            border: '1px solid #e0e0e0',
            transition: 'transform 0.2s',
            ':hover': { transform: 'translateY(-2px)' }
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Box display="flex" alignItems="flex-start" gap={2}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'transparent' }}>
                {getNotificationIcon(notification.type)}
              </Avatar>
              <Box flex={1}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Chip 
                    label={notification.type.toUpperCase()} 
                    size="small" 
                    variant="outlined"
                    sx={{ fontSize: 10, height: 20 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={500}>
                  {notification.message}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
      
      {notifications.length > 2 && (
        <Box textAlign="center" mt={1}>
          <IconButton 
            onClick={() => setExpanded(!expanded)}
            size="small"
            sx={{ bgcolor: '#f5f5f5' }}
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <Typography variant="caption" display="block" color="text.secondary">
            {expanded ? 'Show Less' : `+${notifications.length - 2} more`}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
export default Notifications;
