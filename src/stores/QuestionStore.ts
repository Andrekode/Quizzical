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
    @observable questions: Question[] = [INIT_QUESTION];
    @observable questionsAmount = 10;
    @observable questionsDifficulty = 'easy';
    @observable questionsIndex = 0;
    @observable choices: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    @action
    async getQuestions() {
        if (this.questions.length > 1) return;
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

    @action
    nextQuestion() {
        if (this.questions.length > 0 && this.currentQuestion.question === '') {
            this.currentQuestion = this.questions[this.questionsIndex];
            this.choices = [
                ...this.questions[this.questionsIndex].incorrect_answers,
                this.questions[this.questionsIndex].correct_answer,
            ].sort();
        } else {
            if (this.questionsIndex === this.questionsAmount - 1) return;
            this.questionsIndex++;
            this.currentQuestion = this.questions[this.questionsIndex];
            this.choices = [
                ...this.questions[this.questionsIndex].incorrect_answers,
                this.questions[this.questionsIndex].correct_answer,
            ].sort();
        }
    }

    @action
    previousQuestion() {
        if (this.questions.length > 0 && this.currentQuestion.question === '') {
            this.currentQuestion = this.questions[this.questionsIndex];
            this.choices = [
                ...this.questions[this.questionsIndex].incorrect_answers,
                this.questions[this.questionsIndex].correct_answer,
            ].sort();
        } else {
            if (this.questionsIndex === 0) return;
            this.questionsIndex--;
            this.currentQuestion = this.questions[this.questionsIndex];
            this.choices = [
                ...this.questions[this.questionsIndex].incorrect_answers,
                this.questions[this.questionsIndex].correct_answer,
            ].sort();
        }
    }

    @action
    resetQuestions() {
        this.questions = [];
        this.questionsAmount = 10;
        this.questionsDifficulty = 'easy';
        this.questionsIndex = 0;
        this.choices = [];
        this.currentQuestion = INIT_QUESTION;
    }
}

const questionStore = new QuestionStore();

export default questionStore;
