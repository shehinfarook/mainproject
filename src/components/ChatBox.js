import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Box, Avatar, Typography, IconButton, InputBase, Paper, Fade, Button, Chip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';

function YourAIChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([
    'Show my weekly schedule',
    'Show my payment history',
    'Show my performance chart',
    'How to apply for leave?',
    'Who is my instructor?',
    'Show notifications',
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (msg) => {
    const messageToSend = typeof msg === 'string' ? msg : input;
    if (!messageToSend.trim()) return;
    setLoading(true);
    setMessages(msgs => [...msgs, { from: 'user', text: messageToSend }]);
    try {
      const res = await axios.post('http://localhost:5000/api/chat', { message: messageToSend });
      setMessages(msgs => [...msgs, { from: 'user', text: messageToSend }, { from: 'ai', text: res.data.reply }]);
    } catch {
      setMessages(msgs => [...msgs, { from: 'user', text: messageToSend }, { from: 'ai', text: 'Sorry, something went wrong.' }]);
    }
    setInput('');
    setLoading(false);
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" sx={{ bgcolor: '#8e6be6', color: '#fff', borderRadius: 8, fontWeight: 600, position: 'fixed', bottom: 32, right: 32, zIndex: 1000, boxShadow: 4 }} onClick={() => setOpen(true)}>
        YourAI
      </Button>
      <Fade in={open} timeout={400}>
        <Paper elevation={12} sx={{ position: 'fixed', bottom: 80, right: 32, width: 340, maxWidth: '90vw', borderRadius: 5, p: 2, bgcolor: '#f5f5fa', zIndex: 1200, boxShadow: 12, display: open ? 'block' : 'none' }}>
          <Box display="flex" alignItems="center" mb={1}>
            <Avatar sx={{ bgcolor: '#8e6be6', mr: 1 }}>
              <SmartToyIcon />
            </Avatar>
            <Typography variant="subtitle1" fontWeight={600} color="#8e6be6">YourAI</Typography>
            <Box flex={1} />
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ ml: 1 }}>
              <span style={{ fontWeight: 700, fontSize: 18, color: '#8e6be6' }}>×</span>
            </IconButton>
          </Box>
          <Box sx={{ maxHeight: 140, overflowY: 'auto', mb: 1, px: 1 }}>
            {messages.map((m, i) => (
              <Box key={i} display="flex" justifyContent={m.from === 'user' ? 'flex-end' : 'flex-start'} mb={0.5}>
                {m.from === 'ai' && <Avatar sx={{ width: 22, height: 22, bgcolor: '#8e6be6', mr: 1 }}><SmartToyIcon fontSize="small" /></Avatar>}
                <Paper elevation={1} sx={{ px: 1, py: 0.5, borderRadius: 2, bgcolor: m.from === 'user' ? '#e0e0ff' : '#fff', maxWidth: 180 }}>
                  <Typography variant="body2" color="text.primary">{m.text}</Typography>
                </Paper>
                {m.from === 'user' && <Avatar sx={{ width: 22, height: 22, bgcolor: '#8e6be6', ml: 1 }}>U</Avatar>}
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          {/* Quick action suggestions */}
          <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
            {suggestions.map((s, idx) => (
              <Chip key={idx} label={s} color="primary" variant="outlined" clickable onClick={() => sendMessage(s)} sx={{ fontSize: 12, bgcolor: '#f5f5fa', color: '#8e6be6', borderColor: '#8e6be6' }} />
            ))}
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <InputBase
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              sx={{ flex: 1, bgcolor: '#fff', borderRadius: 2, px: 1, fontSize: 14 }}
              disabled={loading}
            />
            <IconButton onClick={sendMessage} disabled={loading || !input.trim()} sx={{ bgcolor: '#8e6be6', color: '#fff', borderRadius: 2 }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Fade>
    </>
  );
}

export default YourAIChatBox;
