import React from "react"
import classes from "./FinishedQuiz.module.css"
import Button from "../UI/Button/Button";
//import {Link} from "react-router-dom";

const FinishedQuiz = props => {
    const successQuestionsCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }

        return total;
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {
                    props.quiz.map((question, index) => {
                        const cls = [
                            'fa',
                            props.results[question.id] === 'error'
                                ? 'fa-times'
                                : props.results[question.id] === 'success'
                                ? 'fa-check'
                                : '',
                            classes[props.results[question.id]]
                        ]

                        return (
                            <li key={index}>
                                {index + 1}. {question.question}
                                <i className={cls.join(' ')}/>
                            </li>
                        )
                    })
                }
            </ul>
            <div className={classes.FinishedRightAnswers}>
                <strong>Right answers are {successQuestionsCount} of {props.quiz.length}</strong>
            </div>
            <Button type="primary" onClick={props.resultsRepeatHandler}>
                Repeat again
            </Button>
            <Button type="success" onClick={props.backToQuizes}>
                Back to quizes
            </Button>
            {/*or =>*/}
            {/*<Link to="/">*/}
            {/*    <Button type="success" onClick={props.backToQuizes}>*/}
            {/*        Back to quizes*/}
            {/*    </Button>*/}
            {/*</Link>*/}
        </div>
    )
}

export default FinishedQuiz;