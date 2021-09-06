import React from "react"
import {MyContext} from "../../../containers/Quiz/Quiz";
import classes from "./AnswersList.module.css"
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = props => (
    <MyContext.Consumer>
        {
            stateObj => (
                <ul className={classes.AnswerList}>
                    {
                        stateObj.quiz.answers.map((answer, index) => {
                                return (
                                    <AnswerItem key={index} answer={answer.text} answerId={answer.id}
                                        answerStatus={stateObj.answerStatus
                                            ? stateObj.answerStatus[answer.id] // error - 1
                                            : null}
                                    />
                                )
                            }
                        )
                    }
                </ul>
            )
        }
    </MyContext.Consumer>
)

export default AnswersList;