import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Performance from './pages/Performance';
import Payments from './pages/Payments';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';
import Forgot from './pages/Forgot';
import ForgotUserId from './pages/ForgotUserId';
import AdminLogin from './pages/AdminLogin';
import Settings from './pages/Settings';
import InternsList from './pages/InternsList';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


function AppRoutes() {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/performance" element={<Performance />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/forgot-userid" element={<ForgotUserId />} />
      <Route path="/settings" element={<Settings intern={location.state?.intern} />} />
      <Route path="/interns-list" element={<InternsList />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}
export default App;
