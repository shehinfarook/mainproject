import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';

function PaymentHistory({ payments, intern }) {
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);

  if (!payments || payments.length === 0) {
    return <Typography sx={{margin:'20px 0', color:'#888'}}>No payment history available yet.</Typography>;
  }

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

  return (
    <Box>
      <Typography variant="h6" mb={2}>Payment History</Typography>
      {payments.map((p, i) => (
        <Card key={i} sx={{ mb: 2, bgcolor: p.status === 'paid' ? '#e8f5e8' : '#fff3e0' }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography fontWeight={600}>₹{p.amount}</Typography>
                <Typography fontSize={14}>Date: {new Date(p.date).toLocaleDateString()}</Typography>
                <Typography fontSize={14}>Due: {new Date(p.dueDate).toLocaleDateString()}</Typography>
                <Typography fontSize={14} color={p.status === 'paid' ? 'green' : 'orange'}>
                  Status: {p.status || 'pending'}
                </Typography>
              </Box>
              {p.status !== 'paid' && (
                <Button 
                  variant="contained" 
                  sx={{ bgcolor: '#4caf50' }}
                  onClick={() => handlePayNow(p, i)}
                >
                  Pay Now
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
      
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
    </Box>
  );
}
export default PaymentHistory;
