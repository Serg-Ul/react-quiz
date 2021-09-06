import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_FAILED,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, QUIZ_IS_FINISHED, QUIZ_REPEAT, QUIZ_SET_ACTIVE_QUESTION,
    QUIZ_SET_ANSWER_STATUS
} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    isFinished: false,
    activeQuestion: 0,
    answerStatus: null,
    results: {},
    quiz: null
}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        // Quiz
        case FETCH_QUIZ_SUCCESS: {
            return {
                ...state,
                quiz: action.quiz,
                loading: false
            }
        }
        case QUIZ_SET_ANSWER_STATUS : {
            return {
                ...state,
                answerStatus: action.answerStatus,
                results: action.results
            }
        }
        case QUIZ_IS_FINISHED: {
            return {
                ...state,
                isFinished: true
            }
        }
        case QUIZ_SET_ACTIVE_QUESTION: {
            return {
                ...state,
                activeQuestion: action.activeQuestion,
                answerStatus: null
            }
        }
        case QUIZ_REPEAT: {
            return {
                ...state,
                isFinished: false,
                activeQuestion: 0,
                answerStatus: null,
                results: {}
            }
        }
        // QuizList
        case FETCH_QUIZES_START: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_QUIZES_SUCCESS: {
            return {
                ...state,
                quizes: action.quizes,
                loading: false
            }
        }
        case FETCH_QUIZES_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        default: {
            return state;
        }
    }
}

export default quizReducer;