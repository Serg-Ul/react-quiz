import axios from "../../axios/axios-quiz";
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_FAILED,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    QUIZ_IS_FINISHED, QUIZ_REPEAT, QUIZ_SET_ACTIVE_QUESTION,
    QUIZ_SET_ANSWER_STATUS
}
    from "./actionTypes";

// Quiz
export function fetch_quiz_by_id(id) {
    return async dispatch => {
        dispatch(fetch_quizes_started())
        try {
            const response = await axios.get(`/quizes/${id}.json`);
            const quiz = response.data;
            dispatch(fetch_quiz_success(quiz));
        } catch (e) {
            dispatch(fetch_quizes_failed(e))
        }
    }
}

export function fetch_quiz_success(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function quizSetAnswerStatus(answerStatus, results) {
    return {
        type: QUIZ_SET_ANSWER_STATUS,
        answerStatus,
        results
    }
}

export function quizIsFinished() {
    return {
        type: QUIZ_IS_FINISHED
    }
}

export function quizSetActiveQuestion(activeQuestion) {
    return {
        type: QUIZ_SET_ACTIVE_QUESTION,
        activeQuestion
    }
}

export function quiz_answer_click(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerStatus) {
            const key = Object.keys(state.answerStatus)[0];
            if (state.answerStatus[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion];
        const rightAnswer = question.correctAnswerId === answerId;
        const results = state.results

        if (rightAnswer) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetAnswerStatus({
                [answerId]: 'success'
            }, results))

            if (state.activeQuestion + 1 !== state.quiz.length) {
                const timeout = setTimeout(() => {
                    dispatch(quizSetActiveQuestion(state.activeQuestion + 1))
                    clearTimeout(timeout);
                }, 1000)
            } else {
                dispatch(quizIsFinished());
            }
        } else {
            results[question.id] = 'error'

            dispatch(quizSetAnswerStatus({
                [answerId]: 'error'
            }, results))
        }
    }
}

export function repeat_quiz() {
    return {
        type: QUIZ_REPEAT
    }
}

// QuizList
export function fetch_quizes() {
    return async (dispatch) => {
        dispatch(fetch_quizes_started())
        try {
            const response = await axios.get('/quizes.json');
            const quizes = [];

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test number ${index + 1}`
                });
            })

            dispatch(fetch_quizes_success(quizes))
        } catch (e) {
            dispatch(fetch_quizes_failed(e))
        }
    }
}

export function fetch_quizes_started() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetch_quizes_success(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetch_quizes_failed(e) {
    return {
        type: FETCH_QUIZES_FAILED,
        error: e
    }
}