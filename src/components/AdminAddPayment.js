import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, MenuItem, Alert } from '@mui/material';
import axios from 'axios';

function AdminAddPayment() {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!userId || !amount || !date) {
      setError('Please fill all required fields.');
      return;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    try {
      console.log('Sending payment request:', { userId: userId.trim(), amount: parseFloat(amount), date, dueDate });
      const response = await axios.post('http://localhost:5000/api/admin/add-payment', { 
        userId: userId.trim(), 
        amount: parseFloat(amount), 
        date, 
        dueDate 
      });
      console.log('Payment response:', response.data);
      setMessage('Payment added successfully.');
      setUserId('');
      setAmount('');
      setDate('');
      setDueDate('');
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.error || err.message || 'Failed to add payment.');
    }
  };

  return (
    <Card elevation={6} sx={{ borderRadius: 4, bgcolor: '#fffde7', boxShadow: 8, mb: 4 }}>
      <CardContent>
        <Typography variant="h6" mb={2} color="#fbc02d">Add Payment Details</Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField label="User ID" value={userId} onChange={e => setUserId(e.target.value)} required />
          <TextField label="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
          <TextField label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} required />
          <TextField label="Due Date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} InputLabelProps={{ shrink: true }} />
          <Button type="submit" variant="contained" color="primary" sx={{ bgcolor: '#fbc02d' }}>Add Payment</Button>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
        </Box>
      </CardContent>
    </Card>
  );
}

export default AdminAddPayment;
