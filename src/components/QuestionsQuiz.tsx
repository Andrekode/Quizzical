import Questions from '../types/questions.type';
import replaceString from '../utils/replaceString';

interface QuestionsProps {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    answer: string;
    incorrectAnswers: string[];
}
export default function QuestionsQuiz(props: QuestionsProps) {
    const { category, type, difficulty, question, answer, incorrectAnswers } = props;

    const allAnswers = [...incorrectAnswers, answer].sort();

    const handleClick = (): void => {
        console.log('clicked');
    };

    const choice = allAnswers.map((answer) => (
        <div className='choice-div' onClick={handleClick} key={answer}>
            <p className='choice'>{replaceString(answer)}</p>
        </div>
    ));

    return (
        <main>
            <h2 className='question'>{replaceString(question)}</h2>
            <div className='choices-container'>{choice}</div>
            <hr />
        </main>
    );
}
