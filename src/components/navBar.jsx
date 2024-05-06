import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { logout } from '../services/authService'; // Import the logout function

function NavBar() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    logout(); // Call the logout function when the button is clicked
    // You can also redirect the user to the login page or perform any other action after logout
  };

  const handleVerifyTypeSelection = () => {
    // Remove the audit_type_id from local storage
    localStorage.removeItem('audit_type_id');
    localStorage.removeItem('AUDIT_ID');
    navigate('/audit');

    // You can also perform additional actions if needed
  };

  const handleAuditSelection = () => {
    // Remove the AUDIT_ID from local storage
    localStorage.removeItem('AUDIT_ID');
    navigate('/audit');
    // You can also perform additional actions if needed
  };

  const handleNavigateHome = () => {
    navigate('/'); // Navigate to /Home when the title is clicked
  };

  return (
    <AppBar position="static" sx={{ width: '100%', marginBottom: '20px' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={handleNavigateHome}>
          Smart Audit
        </Typography>
        {/* Add the menu items */}
        <Button color="inherit" onClick={handleVerifyTypeSelection}>เลือกประเภท Verify</Button>
        <Button color="inherit" onClick={handleAuditSelection}>เลือกครั้ง Audit</Button>
        <Button color="inherit" onClick={handleLogout}>ออกจากระบบ</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
