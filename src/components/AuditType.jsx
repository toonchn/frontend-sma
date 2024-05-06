import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getAuditType } from '../services/AuditTypeService';

function AuditType() {
  const [auditTypes, setAuditTypes] = useState([]);

  useEffect(() => {
    async function fetchAuditTypes() {
      try {
        const types = await getAuditType(); // เรียกใช้ service เพื่อดึงข้อมูลประเภท
        setAuditTypes(types);
      } catch (error) {
        console.error('Error fetching audit types:', error);
      }
    }

    fetchAuditTypes();
  }, []);

  const handleCardClick = (auditTypeId) => {
    // Store audit_type_id to localStorage
    localStorage.setItem('audit_type_id', auditTypeId);
  };

  return (
    <div>
      {auditTypes.map((type, index) => (
        <Card
          key={index}
          style={{ marginBottom: '10px', cursor: 'pointer' }}
          onClick={() => handleCardClick(type.AUDIT_TYPE_ID)} // Call handleCardClick on card click
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {type.TYPE}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {type.desc}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AuditType;
