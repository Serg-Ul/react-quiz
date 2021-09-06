import {ADD_QUESTION_QUIZ, QUIZ_CREATION_FAILED, RESET_QUIZ_CREATION} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function add_question_quiz(item) {
    return {
        type: ADD_QUESTION_QUIZ,
        item,
    }
}

export function finish_create_quiz() {
    return async (dispatch, getState) => {
        try {
            await axios.post('/quizes.json', getState().create.quiz)
            dispatch(reset_quiz_creation());
        } catch (e) {
            dispatch(quiz_creation_failed(e))
        }
    }
}

export function reset_quiz_creation() {
    return {
        type: RESET_QUIZ_CREATION
    }
}

export function quiz_creation_failed(error) {
    return {
        type: QUIZ_CREATION_FAILED,
        error
    }
}