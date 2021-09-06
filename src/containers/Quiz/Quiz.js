import React, {Component} from "react"
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetch_quiz_by_id, quiz_answer_click, repeat_quiz} from "../../store/actions/quiz";

export const MyContext = React.createContext({});

class Quiz extends Component {
    onBackToQuizesHandler = () => {
        this.props.history.push('/');
    }

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.repeatQuiz()
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Give an answer for the all of questions</h1>
                    {
                        this.props.loading || !this.props.quiz
                            ? <Loader/>
                            : !this.props.isFinished ?
                            <MyContext.Provider value={{
                                quiz: this.props.quiz[this.props.activeQuestion],
                                onAnswerClick: this.props.onQuizAnswerClick,
                                answerStatus: this.props.answerStatus
                            }}>
                                <ActiveQuiz question={this.props.quiz[this.props.activeQuestion].question}
                                            quizLength={this.props.quiz.length}
                                            quizNumQuestion={this.props.activeQuestion + 1}
                                />
                            </MyContext.Provider> :
                            <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                resultsRepeatHandler={this.props.repeatQuiz}
                                backToQuizes={this.onBackToQuizesHandler}
                            />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        error: state.quiz.error,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerStatus: state.quiz.answerStatus,
        results: state.quiz.results,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: (id) => dispatch(fetch_quiz_by_id(id)),
        onQuizAnswerClick: (answerId) => dispatch(quiz_answer_click(answerId)),
        repeatQuiz: () => dispatch(repeat_quiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

