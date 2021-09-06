import React from "react"
import classes from "./QuizList.module.css"
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetch_quizes} from "../../store/actions/quiz";

class QuizList extends React.Component {
    renderQuizTests = () => {
        return this.props.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={"/quiz/" + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>
                        List of tests
                    </h1>

                    {
                        this.props.loading
                            ? <Loader/>
                            : <ul>
                                {this.renderQuizTests()}
                            </ul>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetch_quizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)