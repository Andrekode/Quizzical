import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ComponentProps {
    id: string;
    category: string;
    userAnswer?: string;
    correctAnswer: string;
    question: string;
}

const bull = (
    <Box component='span' sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
        •
    </Box>
);

const card = (props: ComponentProps) => {
    const { id, category, userAnswer, correctAnswer, question } = props;
    return (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                    {id}
                </Typography>
                <Typography variant='h5' component='div'>
                    {category}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                    {question}
                </Typography>
                <Typography variant='body2'>{correctAnswer}</Typography>
                <Typography variant='body2'>{userAnswer}</Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>Learn More</Button>
            </CardActions>
        </React.Fragment>
    );
};

export default function OutlinedCard(props: ComponentProps) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant='outlined'>{card(props)}</Card>
        </Box>
    );
}
