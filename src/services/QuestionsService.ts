import { Question } from '../types/question.type';
import { nanoid } from 'nanoid';

class QuestionsService {
    async fetchQuestions(amount: number, difficulty: string): Promise<Question[]> {
        const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
        const response = await fetch(url);

        if (!response.ok) {
            const message = `An error has occured ${response.status}`;
            throw new Error(message);
        }

        const result = await response.json();

        const questions: Question[] = result.results;

        const question = questions.map((question) => {
            return {
                ...question,
                id: nanoid(),
            };
        });

        return question;
    }

    newF(questionRegistry: Map<string, Question>) {
        const arr: Array<Question> = [];
        for (const question of questionRegistry.values()) {
            arr.push(question);
        }
        return arr;
    }
}

export default new QuestionsService();
