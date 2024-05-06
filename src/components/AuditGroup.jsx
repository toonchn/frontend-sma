import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getAuditGroup } from '../services/AuditGroupService';

function AuditGroup() {
  const [auditGroup, setAuditGroups] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    async function fetchAuditGroups() {
      try {
        const Groups = await getAuditGroup(); // Call service to fetch data
        setAuditGroups(Groups);
        console.log(Groups);
      } catch (error) {
        console.error('Error fetching audit types:', error);
      }
    }

    fetchAuditGroups();
  }, []);

  // Function to handle card click
  const handleCardClick = (groupId) => {
    navigate(`/auditform/${groupId}`); // Navigate to the specified route
  };

  return (
    <div>
      {auditGroup.map((group, index) => (
        <Card key={index} style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={() => handleCardClick(group.AUDIT_GROUP_ID)}>
          <CardContent>
            <Typography variant="h5" component="div">
              {group.NAME}
            </Typography>
            <Typography variant="body" color="text">
              จำนวนข้อ : {group.NUM_QUESTIONS} / คะแนนรวม : {group.TOTAL_K_SCORE}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AuditGroup;
