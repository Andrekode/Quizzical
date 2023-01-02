import * as React from 'react';
import { Stack, Card, CardActions, CardContent, Button, Typography, Box } from '@mui/material';

interface ComponentProps {
    id: string;
    category: string;
    userAnswer?: string;
    correctAnswer: string;
    question: string;
    correct: boolean;
}

export default function OutlinedCard(props: ComponentProps) {
    const { id, category, userAnswer, correctAnswer, question, correct } = props;
    return (
        <Card key={id} variant='outlined' sx={{ backgroundColor: correct ? 'green' : 'red' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                    {id}
                </Typography>
                <Typography variant='h5' component='div'>
                    Category: {category}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                    Question: {question}
                </Typography>
                <Typography variant='body2'>Correct answer: {correctAnswer}</Typography>
                <Typography variant='body2'>You answered: {userAnswer}</Typography>
            </CardContent>
        </Card>
    );
}
