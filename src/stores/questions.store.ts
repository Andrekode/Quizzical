import type { Question } from '../types/question.type';
import { action, makeAutoObservable, observable } from 'mobx';
import QuestionsService from '../services/questions.service';

const INIT_QUESTION: Question = {
    id: '',
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
    @observable questionRegistry = new Map<string, Question>();
    @observable currentSelectedAnswer = '';
    @observable questionsFinished = false;
    @observable doneArray: Question[] = [];
    @observable correctQuestions: Question[] = [];
    @observable questionCorrectCount = 0;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    async getQuestions(): Promise<void> {
        if (this.questions.length > 1) return;
        this.questions = await QuestionsService.fetchQuestions(
            this.questionsAmount,
            this.questionsDifficulty,
        );
    }

    @action
    setDifficulty(difficulty: string): void {
        this.questionsDifficulty = difficulty;
    }

    @action
    setQuestionsAmount(amount: number): void {
        this.questionsAmount = amount;
    }

    @action
    nextQuestion(): void {
        if (this.questions.length > 0 && this.currentQuestion.question === '') {
            this.currentQuestion = this.questions[this.questionsIndex];
            this.choices = [
                ...this.questions[this.questionsIndex].incorrect_answers,
                this.questions[this.questionsIndex].correct_answer,
            ].sort();
        } else if (this.questionsIndex !== this.questionsAmount - 1) {
            this.questionsIndex++;
            this.currentQuestion = this.questions[this.questionsIndex];
            this.choices = [
                ...this.questions[this.questionsIndex].incorrect_answers,
                this.questions[this.questionsIndex].correct_answer,
            ].sort();
        }
    }

    @action
    previousQuestion(): void {
        if (this.questions.length > 0 && this.currentQuestion.question === '') {
            this.currentQuestion = this.questions[this.questionsIndex];
            this.choices = [
                ...this.questions[this.questionsIndex].incorrect_answers,
                this.questions[this.questionsIndex].correct_answer,
            ].sort();
        } else if (this.questionsIndex !== 0) {
            this.questionsIndex--;
            this.currentQuestion = this.questions[this.questionsIndex];
            this.choices = [
                ...this.questions[this.questionsIndex].incorrect_answers,
                this.questions[this.questionsIndex].correct_answer,
            ].sort();
        }
    }

    @action
    resetQuestions(): void {
        this.questions = [];
        this.questionsAmount = 10;
        this.questionsDifficulty = 'easy';
        this.questionsIndex = 0;
        this.choices = [];
        this.currentQuestion = INIT_QUESTION;
        this.questionRegistry.clear();
        this.questionsFinished = false;
        this.correctQuestions = [];
        this.questionCorrectCount = 0;
    }

    @action
    setCurrentSelectedAnswer(answer: string): void {
        this.currentQuestion.userAnswer = answer;
        this.questionRegistry.set(this.currentQuestion.id, this.currentQuestion);
        if (this.questionsAmount === this.questionRegistry.size) {
            this.questionsFinished = true;
            this.doneArray = [...QuestionsService.newF(this.questionRegistry)];
            this.questionRegistry.clear();
            this.correctQuestions = QuestionsService.endResult(this.doneArray);
            this.questionCorrectCount = this.correctQuestions.length;
        }
    }
}

const questionStore = new QuestionStore();

export default questionStore;
