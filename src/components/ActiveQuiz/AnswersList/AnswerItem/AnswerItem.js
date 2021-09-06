import React from "react"
import classes from "./AnswerItem.module.css"
import {MyContext} from "../../../../containers/Quiz/Quiz";

const AnswerItem = props => (
    <MyContext.Consumer>
        {
            stateObj => {
                const cls = [classes.AnswerItem];

                if (stateObj.answerStatus) {
                    cls.push(classes[props.answerStatus]);
                }

                return (
                    <li className={cls.join(' ')} onClick={() => {
                        stateObj.onAnswerClick(props.answerId);
                    }}>
                        {props.answer}
                    </li>
                )
            }
        }
    </MyContext.Consumer>
)

export default AnswerItem;