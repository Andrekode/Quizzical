import React, { useEffect, useState } from 'react';
import questionStore from '../stores/QuestionStore';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { observer } from 'mobx-react';
import replaceString from '../utils/replaceString';

const Questionare = () => {
    const navigate = useNavigate();

    const goBack = (): void => {
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
        return <h1>loading</h1>;
    }

    const choices = questionStore.choices.map((choice) => (
        <Button variant='outlined' size='small' key={choice}>
            {choice}
        </Button>
    ));

    return (
        <div>
            <p>{`${questionStore.questionsIndex + 1} / ${
                questionStore.questions.length
            } Questions`}</p>
            <h1>{replaceString(questionStore.currentQuestion.question)}</h1>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    mt: 2,
                    borderRadius: '15px',
                }}
            >
                {choices}
            </Box>
            <Box sx={{ mt: 4 }}>
                <Button variant='outlined' size='large' onClick={goBack}>
                    Go back
                </Button>
                <Button
                    variant='outlined'
                    size='large'
                    onClick={() => questionStore.previousQuestion()}
                >
                    prev
                </Button>
                <Button
                    variant='outlined'
                    size='large'
                    onClick={() => questionStore.nextQuestion()}
                >
                    next
                </Button>
            </Box>
        </div>
    );
};
export default observer(Questionare);
