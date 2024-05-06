import { useState, useEffect } from 'react';
import { getPlantList } from '../services/PlantListService';
import { Select, MenuItem, Button } from '@mui/material';
import Layout from '../Layout/Layout';

function HomePage() {
    const [plantList, setPlantList] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState('');
    
    useEffect(() => {
        const fetchPlantList = async () => {
            try {
                const data = await getPlantList();
                setPlantList(data);
            } catch (error) {
                console.error('Failed to fetch plant list:', error);
            }
        };

        fetchPlantList();
    }, []);

    const handlePlantChange = (e) => {
        setSelectedPlant(e.target.value);
    };

    const handleSave = () => {
        if (selectedPlant) {
            localStorage.setItem('selectedPlant', selectedPlant); // Save selectedPlant to local storage
            // Navigate to Audit page
            window.location.href = '/audit'; // This will cause a full page reload
            // If you are using React Router, you can use history.push('/audit') instead
        }
    };

    return (
        <Layout>
            <div>
                <section id="content-center">
                    <h2>เลือกโรงงาน</h2>
                    <Select value={selectedPlant} onChange={handlePlantChange} sx={{width: 300}}>
                        <MenuItem value="">Select Plant</MenuItem>
                        {plantList.map((plant) => (
                            <MenuItem key={plant.PLANT_NO} value={plant.PLANT_NO}>
                                {plant.NAME}
                            </MenuItem>
                        ))}
                    </Select>
                    {selectedPlant && (
                        <Button onClick={handleSave} variant="contained">Save</Button> // Click Save to save selectedPlant and navigate to Audit page
                    )}
                </section>
            </div>
        </Layout>
    );
}

export default HomePage;
