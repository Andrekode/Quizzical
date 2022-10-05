import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import questionStore from '../stores/QuestionStore';
import QuestionsMenu from '../components/QuestionsMenu';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [renderQuiz, setRenderQuiz] = useState<boolean>(false);

    const navigate = useNavigate();
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
        </main>
    );
};

export default observer(Home);
