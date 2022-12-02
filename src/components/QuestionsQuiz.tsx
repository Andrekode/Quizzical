import Questions from '../types/questions.type';
import replaceString from '../utils/replaceString';
import { nanoid } from 'nanoid';

interface ComponentProps {
    id: number;
    category: string;
    type: string;
    difficulty: string;
    question: string;
    answer: string;
    incorrectAnswers: string[];
}

export default function QuestionsQuiz(props: ComponentProps) {
    const { category, type, difficulty, question, answer, incorrectAnswers, id } = props;

    const allAnswers = [...incorrectAnswers, answer].sort();

    const options = allAnswers.map((answer) => (
        <div className='choice-div' key={answer}>
            <p className='choice'>{replaceString(answer)}</p>
        </div>
    ));

    return (
        <main>
            <h2 className='question'>{replaceString(question)}</h2>
            <div className='choices-container'>{options}</div>
            <hr />
        </main>
    );
}
