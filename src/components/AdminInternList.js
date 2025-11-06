import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import axios from 'axios';

function AdminInternList({ onSelect }) {
  const [interns, setInterns] = useState([]);
  const [filteredInterns, setFilteredInterns] = useState([]);
  const [selected, setSelected] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/interns').then(res => {
      setInterns(res.data);
      setFilteredInterns(res.data);
    });
  }, []);

  useEffect(() => {
    const filtered = interns.filter(intern => 
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.batchCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInterns(filtered);
  }, [searchTerm, interns]);

  const handleSelect = (id) => {
    setSelected(sel => sel.includes(id) ? sel.filter(s => s !== id) : [...sel, id]);
    if (onSelect) onSelect(id);
  };

  const submitWeeklyTask = async () => {
    if (selected.length === 0) {
      alert('Please select at least one intern');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/admin/submit-weekly-task', { internIds: selected });
      alert('Weekly task submitted successfully!');
      setSelected([]);
    } catch (err) {
      alert('Failed to submit weekly task');
    }
    setSubmitting(false);
  };

  return (
    <Card elevation={4} sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" mb={2} color="#8e6be6">Registered Interns</Typography>
        <TextField
          label="Search Interns"
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by name, user ID, or batch code"
          sx={{ mb: 2 }}
        />
        <Box display="flex" flexDirection="column" gap={2}>
          {filteredInterns.map(intern => (
            <Box key={intern._id} display="flex" alignItems="center" justifyContent="space-between" bgcolor="#f5f5fa" p={2} borderRadius={2}>
              <Box>
                <Typography fontWeight={600}>{intern.name}</Typography>
                <Typography fontSize={14}>Batch: {intern.batchCode}</Typography>
                <Typography fontSize={14}>User ID: {intern.userId}</Typography>
              </Box>
              <FormControlLabel
                control={<Checkbox checked={selected.includes(intern._id)} onChange={() => handleSelect(intern._id)} />}
                label={<Typography fontSize={14}>Select</Typography>}
              />
            </Box>
          ))}
          {selected.length > 0 && (
            <Button 
              variant="contained" 
              sx={{ bgcolor: '#8e6be6', mt: 2 }}
              onClick={submitWeeklyTask}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : `Submit Weekly Task (${selected.length} selected)`}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
export default AdminInternList;
