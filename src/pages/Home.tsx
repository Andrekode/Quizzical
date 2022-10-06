import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import questionStore from '../stores/QuestionStore';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [renderQuiz, setRenderQuiz] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        questionStore.getQuestions();
    }, []);

    const startQuiz = (): void => {
        navigate('/questions');
    };

    return (
        <main>
            <h1>Quizzical</h1>
            <p>Some description</p>
            <Button variant='outlined' size='large' sx={{ mt: 4 }} onClick={startQuiz}>
                Start
            </Button>
            <Button
                variant='outlined'
                size='large'
                sx={{ mt: 4 }}
                onClick={() => questionStore.resetQuestions()}
            >
                restart
            </Button>
        </main>
    );
};

export default observer(Home);
