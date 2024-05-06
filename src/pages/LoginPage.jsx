// src/pages/LoginPage.jsx
import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { login } from '../services/authService';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            await login(username, password);
            // Redirect to home page after successful login
            window.location.href = '/';
        } catch (error) {
            setErrorMessage(error.message || 'Login failed');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '20px',
            }}
        >
            <Typography variant="h2" sx={{ marginBottom: '20px' }}>Smart Audit</Typography>
            <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ marginBottom: '10px', width: '300px' }}
            />
            <TextField
                type="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: '20px', width: '300px' }}
            />
            <Button variant="contained" color="primary" onClick={handleLogin} sx={{ width: '300px' }}>
                Login
            </Button>
            {errorMessage && <Typography color="error" sx={{ marginTop: '20px' }}>{errorMessage}</Typography>}
        </Box>
    );
}

export default LoginPage;
