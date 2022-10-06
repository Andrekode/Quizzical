import Question from '../types/question.type';
class QuestionsService {
    async fetchQuestions(amount: number, difficulty: string): Promise<Question[]> {
        const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
        const response = await fetch(url);

        if (!response.ok) {
            const message = `An error has occured ${response.status}`;
            throw new Error(message);
        }

        const questions = await response.json();
        return questions.results;
    }
}

export default new QuestionsService();
