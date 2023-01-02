import React, { useEffect } from 'react';
import questionStore from '../stores/QuestionStore';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import replaceString from '../utils/replaceString';
import LoadingQuestions from '../components/LoadingQuestions';
import OutlinedCard from '../components/ResultCard';
import type { Question } from '../types/question.type';

const Questionare = () => {
    const navigate = useNavigate();
    const goBack = (): void => {
        questionStore.resetQuestions();
        navigate('/');
    };
    useEffect(() => {
        questionStore.getQuestions();
    }, []);

    useEffect(() => {
        if (questionStore.questions.length < 1) return;

        questionStore.nextQuestion();
    }, [questionStore.questions.length]);

    if (questionStore.currentQuestion.question === '') {
        return (
            <Box
                component='div'
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <LoadingQuestions />;
            </Box>
        );
    }
    const userAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
        const value = event.currentTarget.textContent;
        if (value) {
            questionStore.setCurrentSelectedAnswer(value);
            questionStore.nextQuestion();
        }
    };

    const choices = questionStore.choices.map((choice) => (
        <Button
            variant='outlined'
            size='small'
            key={choice}
            sx={{ mr: 2 }}
            onClick={(e) => userAnswer(e)}
        >
            {replaceString(choice)}
        </Button>
    ));

    const checkForCorrectQuestions = (id: string) => {
        const includesId =
            questionStore.correctQuestions.filter((question) => question.id === id).length > 0;

        return includesId;
    };

    return (
        <Box
            component='div'
            display='flex'
            flexDirection='column'
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                p: 2,
            }}
        >
            {!questionStore.questionFinished ? (
                <>
                    <Box component='div'>
                        <Typography variant='subtitle1'>{`${questionStore.questionsIndex + 1} / ${
                            questionStore.questions.length
                        } Questions`}</Typography>
                        <Box
                            component='div'
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                mt: 2,
                                alignItems: 'center',
                                borderRadius: '15px',
                            }}
                        >
                            <Typography variant='h2' sx={{ mb: 3 }}>
                                {replaceString(questionStore.currentQuestion.question)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        component='div'
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        {choices}
                    </Box>
                    <Box component='div' sx={{ display: 'flex', mt: 4, gap: 2 }}>
                        <Button variant='outlined' size='large' onClick={goBack}>
                            Reset
                        </Button>
                    </Box>
                </>
            ) : (
                <Box>
                    <Stack alignItems='center' justifyContent='center' mb={2}>
                        <Typography variant='h3' textAlign='center'>
                            You had {questionStore.questionCorrectCount} questions correct!
                        </Typography>
                        <Button variant='outlined' size='large' onClick={goBack}>
                            Reset
                        </Button>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        {questionStore.doneArray.map((question) => {
                            return (
                                <OutlinedCard
                                    key={question.id}
                                    id={question.id}
                                    category={question.category}
                                    question={question.question}
                                    userAnswer={question.userAnswer}
                                    correctAnswer={question.correct_answer}
                                    correct={checkForCorrectQuestions(question.id)}
                                />
                            );
                        })}
                    </Stack>
                </Box>
            )}
        </Box>
    );
};
export default observer(Questionare);
