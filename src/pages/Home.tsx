import { useState } from 'react';
import { observer } from 'mobx-react';
import questionStore from '../stores/questions.store';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [renderQuiz, setRenderQuiz] = useState<boolean>(false);

    const navigate = useNavigate();

    const startQuiz = (): void => {
        navigate('/questions');
        questionStore.getQuestions();
    };

    return (
        <Box
            component='div'
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            <Box component='div' sx={{ p: 5 }}>
                <Typography variant='h1'>Quizzical</Typography>
                <Typography variant='subtitle1' sx={{ textAlign: 'center' }}>
                    Some description
                </Typography>
                <Box
                    component='div'
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Button
                        variant='outlined'
                        size='large'
                        sx={{ mt: 4, mr: 2 }}
                        onClick={startQuiz}
                    >
                        Start
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default observer(Home);
