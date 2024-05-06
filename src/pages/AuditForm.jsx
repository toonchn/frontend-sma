import { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuditQuestions } from '../services/AuditQuestionService';
import Layout from '../Layout/Layout';
import { Container, Alert, Snackbar } from '@mui/material'; // Import Alert and Snackbar
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { postAuditResult } from '../services/AuditPostService';

function AuditForm() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false); // State for success alert
    const [openErrorAlert, setOpenErrorAlert] = useState(false); // State for error alert
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate();

    const { GroupId } = useParams();

    useEffect(() => {
        getAuditQuestions(GroupId)
            .then(data => {
                console.log('Questions data:', data);
                setQuestions(data);
            })
            .catch(error => {
                console.error('Error from fetchQuestions:', error);
                setErrorMessage('Failed to fetch questions. Please try again.');
                setOpenErrorAlert(true); // Open error alert
            });
    }, [GroupId]);

    const handleChange = (QUESTION_ID, event) => {
        const selectedText = event.target.value;
        const selectedChoice = questions.find(q => q.QUESTION_ID === QUESTION_ID).CHOICE.find(c => c.description === selectedText);
        const questionText = questions.find(q => q.QUESTION_ID === QUESTION_ID).QUESTION_TEXT;
        if (selectedChoice) {
            setAnswers(prevAnswers => ({
                ...prevAnswers,
                [QUESTION_ID]: {
                    audit_group_id: GroupId,
                    question_id: QUESTION_ID,
                    question_text: questionText,
                    choice_text: selectedChoice.description,
                    k_score: selectedChoice.score
                }
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(answers);
        try {
            await postAuditResult(answers);
            setAnswers({});
            console.log('Audit results posted successfully');
            setOpenSuccessAlert(true); // Open success alert
            // Navigate back to '/audit' after 3 seconds
            setTimeout(() => {
                navigate('/audit');
            }, 1000);
        } catch (error) {
            console.error('Failed to post audit results:', error);
            setErrorMessage('Failed to submit audit results. Please try again.');
            setOpenErrorAlert(true); // Open error alert
        }
    };

    const handleSuccessAlertClose = () => {
        setOpenSuccessAlert(false); // Close success alert
    };

    const handleErrorAlertClose = () => {
        setOpenErrorAlert(false); // Close error alert
    };

    return (
        <Layout>
            <Container component="main" maxWidth="xs">
                <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
                    <form onSubmit={handleSubmit}>
                        {questions.map((question) => (
                            <Fragment key={question.QUESTION_ID}>
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
                                                    {question.QUESTION_TEXT}
                                                </Typography>
                                            </FormLabel>
                                            <RadioGroup
                                                key={`question-${question.QUESTION_ID}`}
                                                value={answers[question.QUESTION_ID]?.choice_text || ''}
                                                onChange={(event) => handleChange(question.QUESTION_ID, event)}
                                                sx={{ fontSize: 15 }}
                                            >
                                                {Array.isArray(question.CHOICE) && question.CHOICE.map((choice) => (
                                                    <FormControlLabel
                                                        key={choice.no}
                                                        value={choice.description}
                                                        control={<Radio />}
                                                        label={choice.description}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </CardContent>
                                </Card>
                            </Fragment>
                        ))}
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </form>
                    {/* Success alert */}
                    <Snackbar open={openSuccessAlert} autoHideDuration={6000} onClose={handleSuccessAlertClose}>
                        <Alert onClose={handleSuccessAlertClose} severity="success" sx={{ width: '100%' }}>
                           เพิ่มข้อมูลเรียบร้อย
                        </Alert>
                    </Snackbar>
                    {/* Error alert */}
                    <Snackbar open={openErrorAlert} autoHideDuration={6000} onClose={handleErrorAlertClose}>
                        <Alert onClose={handleErrorAlertClose} severity="error" sx={{ width: '100%' }}>
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            </Container>
        </Layout>
    );
}

export default AuditForm;
