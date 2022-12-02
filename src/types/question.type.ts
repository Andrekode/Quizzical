export interface Question {
    id: string;
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    userAnswer?: string;
}

export interface UserAnswers extends Question {
    userAnswer: string;
}
