// src/services/authService.jsx
import axios from 'axios';

const API_URL = 'http://localhost:3001'; // เปลี่ยน URL เพื่อให้ตรงกับ API endpoint ของคุณ

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        if (response.data.success) {
            localStorage.setItem('userToken', response.data.token);  // Save the token
            localStorage.setItem('userId', response.data.userId);    // Save the userId
            return response.data;
        }
    } catch (error) {
        console.error('Login failed:', error.response.data);
        throw error.response.data;
    }
};

const logout = () => {
    localStorage.clear();
    window.location.href = '/';
};

const isAuthenticated = () => {
    return !!localStorage.getItem('userToken');
};

const getUserId = async () => {
    const userToken = localStorage.getItem('userToken');
    try {
        const response = await axios.get(`${API_URL}/getUserId`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
        return response.data.userId;
    } catch (error) {
        console.error('Failed to get user ID:', error.response.data);
        throw error.response.data;
    }
};

export { login, logout, isAuthenticated, getUserId };
