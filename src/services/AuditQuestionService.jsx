import axios from 'axios';

const API_URL = 'http://localhost:3001';

const getAuditQuestions = async (auditGroupId) => {
    try {
        const response = await axios.get(`${API_URL}/auditQuestion?audit_group=${auditGroupId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch audit questions:', error);
        throw error;
    }
};

export { getAuditQuestions };
