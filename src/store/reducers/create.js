import {ADD_QUESTION_QUIZ, QUIZ_CREATION_FAILED, RESET_QUIZ_CREATION} from "../actions/actionTypes";

const initialState = {
    quiz: [],
    error: null
}

const createReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_QUESTION_QUIZ:
            return {
                ...state,
                quiz: [...state.quiz, action.item]
            }
        case RESET_QUIZ_CREATION:
            return {
                ...state,
                quiz: []
            }
        case QUIZ_CREATION_FAILED:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default createReducer;