import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Button, Box, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip } from '@mui/material';
import { Payment, CheckCircle, Schedule } from '@mui/icons-material';
import axios from 'axios';

function Payments() {
  const [intern, setIntern] = useState(null);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = token ? JSON.parse(atob(token.split('.')[1])).id : null;
    if (id) {
      axios.get(`http://localhost:5000/api/intern/dashboard/${id}`).then(res => setIntern(res.data));
    }
  }, []);

  const handlePayNow = (payment, index) => {
    setSelectedPayment({...payment, index});
    setPaymentDialog(true);
  };

  const processPayment = async () => {
    if (!cardNumber || !expiryDate || !cvv) {
      alert('Please fill all payment details');
      return;
    }
    setProcessing(true);
    try {
      await axios.post('http://localhost:5000/api/intern/process-payment', {
        userId: intern.userId,
        paymentIndex: selectedPayment.index,
        amount: selectedPayment.amount
      });
      alert('Payment successful!');
      setPaymentDialog(false);
      window.location.reload();
    } catch (err) {
      alert('Payment failed. Please try again.');
    }
    setProcessing(false);
  };

  if (!intern) return <Typography>Loading...</Typography>;

  const payments = intern.payments || [];
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status !== 'paid').reduce((sum, p) => sum + p.amount, 0);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight={700} color="#1976d2" mb={4}>Payment Dashboard</Typography>
      
      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#e8f5e8', borderLeft: '4px solid #4caf50' }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <CheckCircle sx={{ color: '#4caf50', mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h6" color="#4caf50">Total Paid</Typography>
                  <Typography variant="h4" fontWeight={700}>₹{totalPaid}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#fff3e0', borderLeft: '4px solid #ff9800' }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Schedule sx={{ color: '#ff9800', mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h6" color="#ff9800">Pending</Typography>
                  <Typography variant="h4" fontWeight={700}>₹{totalPending}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#e3f2fd', borderLeft: '4px solid #2196f3' }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Payment sx={{ color: '#2196f3', mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h6" color="#2196f3">Total Payments</Typography>
                  <Typography variant="h4" fontWeight={700}>{payments.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Payment Cards */}
      <Typography variant="h5" mb={3}>Payment Details</Typography>
      <Grid container spacing={3}>
        {payments.map((payment, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ 
              bgcolor: payment.status === 'paid' ? '#e8f5e8' : '#fff3e0',
              border: payment.status === 'paid' ? '2px solid #4caf50' : '2px solid #ff9800'
            }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight={700}>₹{payment.amount}</Typography>
                  <Chip 
                    label={payment.status === 'paid' ? 'PAID' : 'PENDING'} 
                    color={payment.status === 'paid' ? 'success' : 'warning'}
                    variant="filled"
                  />
                </Box>
                <Typography variant="body2" mb={1}>
                  <strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}
                </Typography>
                {payment.dueDate && (
                  <Typography variant="body2" mb={1}>
                    <strong>Due Date:</strong> {new Date(payment.dueDate).toLocaleDateString()}
                  </Typography>
                )}
                {payment.paidDate && (
                  <Typography variant="body2" mb={2} color="success.main">
                    <strong>Paid On:</strong> {new Date(payment.paidDate).toLocaleDateString()}
                  </Typography>
                )}
                {payment.status !== 'paid' && (
                  <Button 
                    variant="contained" 
                    fullWidth
                    sx={{ bgcolor: '#4caf50', mt: 2 }}
                    onClick={() => handlePayNow(payment, index)}
                  >
                    Pay Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {payments.length === 0 && (
        <Card sx={{ textAlign: 'center', p: 4 }}>
          <Payment sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">No payment details available</Typography>
        </Card>
      )}

      {/* Payment Dialog */}
      <Dialog open={paymentDialog} onClose={() => setPaymentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Payment Gateway</DialogTitle>
        <DialogContent>
          <Typography mb={2}>Amount: ₹{selectedPayment?.amount}</Typography>
          <TextField 
            label="Card Number" 
            fullWidth 
            margin="normal" 
            value={cardNumber} 
            onChange={e => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
          />
          <Box display="flex" gap={2}>
            <TextField 
              label="Expiry Date" 
              value={expiryDate} 
              onChange={e => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
            />
            <TextField 
              label="CVV" 
              value={cvv} 
              onChange={e => setCvv(e.target.value)}
              placeholder="123"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={processPayment}
            disabled={processing}
          >
            {processing ? 'Processing...' : 'Pay Now'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Payments;