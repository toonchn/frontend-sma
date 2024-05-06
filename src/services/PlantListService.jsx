import axios from 'axios';

const API_URL = 'http://localhost:3001';

const getPlantList = async () => {
    try {
        const response = await axios.get(`${API_URL}/plantList`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch plant list:', error);
        throw error;
    }
};

export { getPlantList };