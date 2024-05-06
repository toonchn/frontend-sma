// AuditHistoryService.jsx
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const getHistory = async (plant_no) => {
    try {
        const response = await axios.get(`${API_URL}/auditHistory?plant_no=${plant_no}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch audit questions:', error);
        throw error;
    }
};

export { getHistory };
