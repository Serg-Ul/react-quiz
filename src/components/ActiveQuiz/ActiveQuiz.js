import React from "react"
import classes from "./ActiveQuize.module.css"
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>
                        {props.quizNumQuestion}. {props.question}
                    </strong>
                </span>
                <small>
                    {props.quizNumQuestion} of {props.quizLength}
                </small>
            </p>
            <AnswersList/>
        </div>
    )
}

export default ActiveQuiz;