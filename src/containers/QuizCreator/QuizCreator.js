import React from "react"
import classes from "./QuizCreator.module.css"
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {add_question_quiz, finish_create_quiz} from "../../store/actions/create";

function setOption(numberOfOption) {
    return createControl({
        label: `Variant ${numberOfOption}`,
        errorMessage: `Variant ${numberOfOption} can not be empty`,
        id: numberOfOption
    }, {
        required: true
    });
}

function recreateFormControls() {
    return {
        question: createControl({
            label: 'Enter question',
            errorMessage: 'Question can not be empty'
        }, {
            required: true
        }),
        optionOne: setOption(1),
        optionTwo: setOption(2),
        optionThree: setOption(3),
        optionFour: setOption(4),
    }
}

function renderQuestionAnswers(formControls) {
    return Object.keys(formControls).map((controlName) => {
        const control = formControls[controlName]
        return {
            id: control.id,
            text: control.value
        }
    });
}

class QuizCreator extends React.Component {

    state = {
        isFormValid: false,
        correctAnswerId: 1,
        formControls: recreateFormControls()
    }

    onChangeInputHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]};

        control.value = value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control

        this.setState({
            isFormValid: validateForm(formControls),
            formControls
        })
    }

    onChangeSelectHandler = (event) => {
        //console.log(event.target.value)
        this.setState({
            correctAnswerId: +event.target.value
        })
    }

    renderInputs() {
        const formControls = this.state.formControls;

        return Object.keys(formControls).map((controlName, index) => {
            const formControl = formControls[controlName];
            //console.log(!!formControl.validation)
            return (
                <React.Fragment key={controlName + index}>
                    <Input
                        name={formControl.name}
                        value={formControl.value}
                        type={formControl.type}
                        label={formControl.label}
                        errorMessage={formControl.errorMessage}
                        valid={formControl.valid}
                        touched={formControl.touched}
                        shouldValidate={!!formControl.validation}
                        onChange={(event) => {
                            this.onChangeInputHandler(event.target.value, controlName)
                        }}
                    />
                    {
                        controlName === 'question' ? <hr/> : null
                    }
                </React.Fragment>
            )
        });
    }

    createQuizHandler = () => {
        // axios.post('https://react-components-practice-default-rtdb.firebaseio.com/quizes.json', this.state.quiz)
        //     .then((response) => {
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         throw new Error(error);
        //     })
        //console.log(response.data);
        this.setState({
            isFormValid: false,
            correctAnswerId: 1,
            formControls: recreateFormControls()
        })
        this.props.finishCreateQuiz()
    }

    addQuestionHandler = () => {
        const formControls = {...this.state.formControls}
        const questionAnswers = renderQuestionAnswers(formControls);
        const questionItem = {
            id: this.props.quiz.length + 1,
            correctAnswerId: this.state.correctAnswerId,
            question: questionAnswers[0].text,
            answers: questionAnswers.filter((answer, index) => index !== 0)
        }

        this.props.addQuestionQuiz(questionItem);

        this.setState({
            isFormValid: false,
            correctAnswerId: 1,
            formControls: recreateFormControls()
        })
    }

    submitHandler(event) {
        event.preventDefault();
    }

    render() {
        const select = <Select
            label="Select correct answer"
            value={this.state.correctAnswerId}
            onChange={this.onChangeSelectHandler}
            options={[
                {
                    value: 1,
                    text: 1
                },
                {
                    value: 2,
                    text: 2
                },
                {
                    value: 3,
                    text: 3
                },
                {
                    value: 4,
                    text: 4
                }
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>QuizCreator</h1>
                    <form onSubmit={this.submitHandler}>

                        {this.renderInputs()}
                        {select}

                        <Button type="primary" disabled={!this.state.isFormValid} onClick={this.addQuestionHandler}>
                            Add question
                        </Button>
                        <Button type="success" disabled={this.props.quiz.length === 0} onClick={this.createQuizHandler}>
                            Create test
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addQuestionQuiz: (item) => dispatch(add_question_quiz(item)),
        finishCreateQuiz: () => dispatch(finish_create_quiz()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)