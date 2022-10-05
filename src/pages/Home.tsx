import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import QuestionsQuiz from '../components/QuestionsQuiz';
import questionStore from '../stores/QuestionStore';
import QuestionsMenu from '../components/QuestionsMenu';
import { Button } from '@mui/material';

const Home = () => {
    const [renderQuiz, setRenderQuiz] = useState<boolean>(false);

    useEffect(() => {
        questionStore.getQuestions();
    }, []);

    const quest = questionStore.questions?.map((q, i) => (
        <QuestionsQuiz
            key={i}
            category={q.category}
            type={q.type}
            difficulty={q.difficulty}
            question={q.question}
            answer={q.correct_answer}
            incorrectAnswers={q.incorrect_answers}
        />
    ));
    console.log(questionStore.questions);

    const startQuiz = (): void => {
        setRenderQuiz(true);
    };

    return (
        <>
            {!renderQuiz && questionStore.questions ? (
                <main>
                    <h1>Quizzical</h1>
                    <p>Some description</p>
                    <Button variant='outlined' size='large' sx={{ mt: 4 }} onClick={startQuiz}>
                        Start
                    </Button>
                </main>
            ) : (
                <div>{quest}</div>
            )}
        </>
    );
};

export default observer(Home);
