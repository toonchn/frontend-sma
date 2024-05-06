import axios from 'axios';

const API_URL = 'http://localhost:3001';

const postAuditResult = async (auditResultData) => {
    try {
        // ดึงข้อมูล plant_no จาก localStorage
        const plantNo = localStorage.getItem('selectedPlant');
        // ดึงข้อมูล create_by_user_id จาก localStorage
        const userId = localStorage.getItem('userId');

        const AuditTypeId = parseInt(localStorage.getItem('audit_type_id')); // เปลี่ยนเป็น integer
        const AUDIT_ID = parseInt(localStorage.getItem('AUDIT_ID')); // เปลี่ยนเป็น integer

        // ลูปผ่านข้อมูลการตรวจสอบผลลัพธ์
        for (const key in auditResultData) {
            const questionData = auditResultData[key];

            // สร้างข้อมูลที่จะโพสต์ไปยัง API ในรูปแบบที่ต้องการ
            const postData = {
                audit_group_id: parseInt(questionData.audit_group_id), // เปลี่ยนเป็น integer
                audit_type_id: AuditTypeId,
                audit_id: AUDIT_ID,
                question_id: parseInt(questionData.question_id), // เปลี่ยนเป็น integer
                plant_no: plantNo, // กำหนด plant_no จาก localStorage
                choice_results: questionData.choice_text,
                k_score: parseInt(questionData.k_score), // เปลี่ยนเป็น integer
                create_by_user_id: parseInt(userId) // เปลี่ยนเป็น integer
            };

            // โพสต์ข้อมูลไปยัง API พร้อมกับระยะเวลาระหว่างแต่ละรายการ
            await new Promise((resolve) => {
                setTimeout(async () => {
                    await axios.post(`${API_URL}/auditResult`, postData);
                    resolve();
                }, 2000); // ระยะเวลา 2 วินาที
            });
        }

        console.log('Audit results posted successfully');
    } catch (error) {
        console.error('Failed to post audit results:', error);
        throw error;
    }
};


export { postAuditResult };
