import { useState, useEffect, Fragment } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services/GetAPI';
function AuditForm({ groupId, onBack }) {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    AuditForm.propTypes = {
        groupId: PropTypes.number.isRequired,
        onBack: PropTypes.func.isRequired,
    };

    useEffect(() => {
        fetchQuestions(groupId)
            .then(data => {
                console.log('Questions data:', data);
                setQuestions(data);
            })
            .catch(error => console.error('Error from fetchQuestions:', error));
    }, [groupId]);

    const handleChange = (questionId, event) => {
        const selectedText = event.target.value;
        const selectedChoice = JSON.parse(questions.find(q => q.question_id === questionId).choices)
            .find(c => c.choice_text === selectedText);
        const questionText = questions.find(q => q.question_id === questionId).question_text; // เพิ่มบรรทัดนี้เพื่อดึง question_text ของคำถาม
        if (selectedChoice) {
            setAnswers(prevAnswers => ({
                ...prevAnswers,
                [questionId]: {
                    question_id: questionId,
                    question_text: questionText, // เพิ่ม question_text ลงใน object ของคำตอบ
                    choice_text: selectedChoice.choice_text,
                    point: selectedChoice.point
                }
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(answers);
        // Handle form submission logic here (e.g., send answers to server)
    };

    return (
        <Container component="form" onSubmit={handleSubmit}>
            <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
                <button onClick={onBack}>Back to Select Group</button>
                {questions.map((question) => (
                    <Fragment key={question.question_id}>
                        <Card
                            sx={{
                                width: 310,
                                minWidth: 275,
                                margin: 2,
                                boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                                cursor: "pointer"
                            }}
                        >
                            <CardContent>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        <Typography variant="h5">
                                            {question.question_text}
                                        </Typography>
                                    </FormLabel>
                                    <RadioGroup
                                        name={`question-${question.question_id}`}
                                        value={answers[question.question_id]?.choice_text || ''}
                                        onChange={(event) => handleChange(question.question_id, event)}
                                        sx={{ fontSize: 15 }}
                                    >
                                        {Array.isArray(JSON.parse(question.choices)) && JSON.parse(question.choices).map((choice) => (
                                            <FormControlLabel
                                                key={choice.choice_no}
                                                value={choice.choice_text}
                                                control={<Radio />}
                                                label={choice.choice_text}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </Fragment>
                ))}
                <Fab color="primary" aria-label="save" sx={{ position: 'fixed', bottom: 16, right: 16 }} type="submit">
                    <SaveIcon />
                </Fab>
            </Box>
        </Container>
    );
}
export default AuditForm;