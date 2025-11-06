import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import { Schedule, AccessTime, Group } from '@mui/icons-material';
import axios from 'axios';

function ScheduleViewer({ intern }) {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/schedules');
        setSchedules(res.data);
      } catch (err) {
        console.error('Failed to fetch schedules:', err);
      }
      setLoading(false);
    };
    fetchSchedules();
  }, []);

  if (loading) {
    return <Typography color="text.secondary">Loading schedule...</Typography>;
  }

  if (!schedules || schedules.length === 0) {
    return (
      <Card sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5' }}>
        <Schedule sx={{ fontSize: 40, color: '#ccc', mb: 1 }} />
        <Typography color="text.secondary">No schedule available yet</Typography>
      </Card>
    );
  }

  return (
    <Box>
      {schedules.slice(0, 2).map((schedule, i) => (
        <Card key={i} sx={{ mb: 1, bgcolor: '#e3f2fd', border: '1px solid #2196f3' }}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Schedule sx={{ color: '#2196f3', fontSize: 20 }} />
              <Typography variant="subtitle2" fontWeight={600}>
                {schedule.fileName || 'Weekly Schedule'}
              </Typography>
            </Box>
            <Box display="flex" gap={1} mb={1}>
              <Chip 
                icon={<AccessTime />} 
                label={`${new Date(schedule.week).toLocaleDateString()} - ${new Date(schedule.endWeek).toLocaleDateString()}`} 
                size="small" 
                variant="outlined"
              />
            </Box>
            {schedule.extractedData?.timings?.length > 0 && (
              <Typography variant="body2" color="text.primary">
                {schedule.extractedData.timings.slice(0, 3).join(' • ')}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
      {schedules.length > 2 && (
        <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
          +{schedules.length - 2} more schedules
        </Typography>
      )}
    </Box>
  );
}
export default ScheduleViewer;
