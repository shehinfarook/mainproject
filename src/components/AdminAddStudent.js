import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';

function AdminAddStudent() {
  const [name, setName] = useState('');
  const [batchCode, setBatchCode] = useState('');
  const [message, setMessage] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/add-student', { name, batchCode });
      setMessage('Student added successfully!');
      setName('');
      setBatchCode('');
    } catch (err) {
      setMessage('Failed to add student.');
    }
  };

  return (
    <Paper elevation={2} style={{padding:20, marginBottom:20}}>
      <Typography variant="h6">Add Student</Typography>
      <form onSubmit={handleAdd}>
        <TextField label="Student Name" value={name} onChange={e => setName(e.target.value)} fullWidth margin="normal" />
        <TextField label="Batch Code" value={batchCode} onChange={e => setBatchCode(e.target.value)} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary">Add Student</Button>
      </form>
      {message && <Typography color="secondary" style={{marginTop:10}}>{message}</Typography>}
    </Paper>
  );
}
export default AdminAddStudent;
