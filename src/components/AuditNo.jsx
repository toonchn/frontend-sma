import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { getHistory } from '../services/AuditHistoryService';

function AuditNo() {
  const [auditHistory, setAuditHistory] = useState([]);
  const [newAuditId, setNewAuditId] = useState(null);
  const [plant_no] = useState(localStorage.getItem('selectedPlant') || null);


  useEffect(() => {
    async function fetchAuditHistory() {
      try {
        const history = await getHistory(plant_no);
        setAuditHistory(history);
      } catch (error) {
        console.error('Failed to fetch audit history:', error);
      }
    }

    fetchAuditHistory();
  }, []);

  // Function to handle click on a card
  const handleCardClick = (auditId) => {
    localStorage.setItem('AUDIT_ID', auditId);
    // Perform any additional actions if needed
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        เลือกครั้งการ Verify
      </Typography>
      <Card
        id="new-audit"
        variant="outlined"
        sx={{
          width: 310,
          minWidth: 275,
          margin: 2,
          boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          cursor: "pointer",
        }}
        onClick={() => handleCardClick(newAuditId + 1)} // Call handleCardClick with newAuditId + 1
      >
        <CardContent>
          <Typography variant="body1">Audit ใหม่</Typography>
        </CardContent>
      </Card>
      {auditHistory.map((audit, index) => {
  const displayIndex = auditHistory.length - index;
  const status = audit.isComplete === 1 ? 'green' : 'red';
  const cardSx = {
    width: 310,
    minWidth: 275,
    margin: 2,
    boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
    cursor: "pointer",
  };
  if (status === 'green') {
    cardSx.backgroundColor = 'success.main'; // เปลี่ยนสีพื้นหลังเป็นสีเขียวสำหรับสถานะเสร็จสมบูรณ์
  } else if (status === 'red') {
    cardSx.backgroundColor = 'warning.main'; // เปลี่ยนสีพื้นหลังเป็นสีแดงสำหรับสถานะเตือน
  }
  return (
    <Card
      key={index}
      variant="outlined"
      sx={cardSx}
      onClick={() => handleCardClick(audit.AUDIT_ID)}
    >
      <CardContent>
        <h1>
          โรงงาน : {audit.NAME}
        </h1>
        <Typography variant="body1">Verify ครั้งที่ : {displayIndex}</Typography>
        <Typography variant="body2">Verify ID: {audit.AUDIT_ID}</Typography>
        <Typography variant="body2">คะแนน {audit.actual_score} / {audit.total_score}</Typography>
        <Typography variant="body2">Verify เมื่อวันที่ : {audit.create_date} </Typography>
        <Typography variant="body2">อัพเดทล่าสุด : {audit.update_date} </Typography>
        <Typography variant="body2">โดย : {audit.firstname} {audit.lastname} </Typography>
      </CardContent>
    </Card>
  );
})}

    </div>
  );
}

export default AuditNo;
