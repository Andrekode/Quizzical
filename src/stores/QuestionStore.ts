import type Question from '../types/question.type';
import { action, makeAutoObservable, observable } from 'mobx';
import QuestionsService from '../services/QuestionsService';

const INIT_QUESTION: Question = {
    category: '',
    type: '',
    difficulty: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
};

class QuestionStore {
    @observable currentQuestion: Question = INIT_QUESTION;
    @observable questions: Question[] = [];
    @observable questionsAmount = 5;
    @observable questionsDifficulty = 'easy';

    constructor() {
        makeAutoObservable(this);
    }

    @action
    async getQuestions() {
        this.questions = await QuestionsService.fetchQuestions(
            this.questionsAmount,
            this.questionsDifficulty,
        );
    }

    @action
    setDifficulty(difficulty: string) {
        this.questionsDifficulty = difficulty;
    }

    @action
    setQuestionsAmount(amount: number) {
        this.questionsAmount = amount;
    }
}

const questionStore = new QuestionStore();

export default questionStore;
