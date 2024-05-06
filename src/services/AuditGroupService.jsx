import axios from 'axios';

const API_URL = 'http://localhost:3001';

const getAuditGroup = async () => {
    try {
        const response = await axios.get(`${API_URL}/auditList`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch plant list:', error);
        throw error;
    }
};

export { getAuditGroup };