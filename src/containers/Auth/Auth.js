import React from "react"
import classes from "./Auth.module.css"
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from "is_js"
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";

class Auth extends React.Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                name: 'email',
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Please enter valid email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                name: 'password',
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Minimum length is 6',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = is.email(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    onChangeInputHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isValid = true;

        Object.keys(formControls).forEach((controlName) => {
            isValid = formControls[controlName].valid && isValid
        });

        this.setState({
            isFormValid: isValid,
            formControls
        })
    }

    onRenderInputs = () => {
        const formControls = this.state.formControls;

        return Object.keys(formControls).map((controlName, index) => {
            const formControl = formControls[controlName];
            //console.log(!!formControl.validation)
            return (
                <Input
                    key={controlName + index}
                    name={formControl.name}
                    value={formControl.value}
                    type={formControl.type}
                    label={formControl.label}
                    errorMessage={formControl.errorMessage}
                    valid={formControl.valid}
                    touched={formControl.touched}
                    shouldValidate={!!formControl.validation}
                    onChange={(event) => {
                        this.onChangeInputHandler(event, controlName)
                    }}
                />
            )
        });
    }

    onLoginHandler = () => {
        this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, true);
    }

    onRegisterHandler = () => {
        this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, false);
    }

    onSubmitHandler = event => {
        event.preventDefault();
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>

                    <form className={classes.AuthForm} onSubmit={this.onSubmitHandler}>
                        {
                            this.onRenderInputs()
                        }
                        <Button type="success" disabled={!this.state.isFormValid} onClick={this.onLoginHandler}>Sign
                            in</Button>
                        <Button type="primary" disabled={!this.state.isFormValid} onClick={this.onRegisterHandler}>Sign
                            up</Button>
                    </form>
                </div>
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {}
// }

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);