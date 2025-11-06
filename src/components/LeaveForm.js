import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, Box, Alert, List, ListItem, ListItemText, Chip } from '@mui/material';

function LeaveForm({ internId }) {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [showAllHistory, setShowAllHistory] = useState(false);

  useEffect(() => {
    // Fetch leave history for intern
    if (internId) {
      axios.get(`http://localhost:5000/api/intern/dashboard/${internId}`)
        .then(res => setLeaveHistory(res.data.leaveRequests || []));
    }
  }, [internId, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!date || !reason) {
      setError('Please fill in both date and reason.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/intern/leave', { internId, date, reason });
      setMessage('Leave request submitted.');
      setDate('');
      setReason('');
    } catch {
      setError('Failed to submit leave request.');
    }
    setLoading(false);
  };

  return (
    <Card elevation={4} sx={{ maxWidth: 400, mx: 'auto', mt: 2, borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} color="#6a0dad" gutterBottom>Apply for Leave</Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Reason"
            multiline
            minRows={2}
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Enter reason for leave"
            required
          />
          <Button type="submit" variant="contained" disabled={loading} sx={{ bgcolor: '#6a0dad', color: '#fff' }}>
            {loading ? 'Submitting...' : 'Apply'}
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
        </Box>
        {/* Leave History Section */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight={500} color="#6a0dad" mb={1}>Leave History</Typography>
          <List dense>
            {leaveHistory.length === 0 && <ListItem><ListItemText primary="No leave requests yet." /></ListItem>}
            {(showAllHistory ? leaveHistory : leaveHistory.slice(0, 2)).map((leave, idx) => (
              <ListItem key={idx} sx={{ bgcolor: '#f5f5fa', borderRadius: 2, mb: 1 }}>
                <ListItemText
                  primary={leave.date ? new Date(leave.date).toLocaleDateString() : 'N/A'}
                  secondary={leave.reason || 'No reason'}
                />
                <Chip label={leave.status || 'pending'} color={leave.status === 'approved' ? 'success' : leave.status === 'rejected' ? 'error' : 'warning'} size="small" sx={{ ml: 2 }} />
              </ListItem>
            ))}
            {leaveHistory.length > 2 && (
              <Box textAlign="center" mt={1}>
                <Button 
                  size="small" 
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  sx={{ color: '#6a0dad' }}
                >
                  {showAllHistory ? 'Show Less' : `View More (${leaveHistory.length - 2} more)`}
                </Button>
              </Box>
            )}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
}

export default LeaveForm;
