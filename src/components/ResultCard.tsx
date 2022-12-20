import * as React from 'react';
import { Stack, Card, CardActions, CardContent, Button, Typography, Box } from '@mui/material';

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
        <Card key={props.id} variant='outlined'>
            {card(props)}
        </Card>
    );
}
