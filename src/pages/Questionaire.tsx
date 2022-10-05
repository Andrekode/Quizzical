import React, { useEffect, useState } from 'react';
import QuestionsQuiz from '../components/QuestionsQuiz';
import questionStore from '../stores/QuestionStore';
import Questions from '../types/questions.type';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { observer } from 'mobx-react';

const Questionare = () => {
    const [playerChoice, setPlayerChoice] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        questionStore.getQuestions();
    }, []);

    const choice = (id: number) => {
        console.log(id);
    };

    const goBack = (): void => {
        navigate('/');
    };

    return (
        <div>
            <div>
                <Button variant='outlined' size='large' sx={{ mt: 4 }} onClick={goBack}>
                    Go back
                </Button>
            </div>
        </div>
    );
};
export default observer(Questionare);
