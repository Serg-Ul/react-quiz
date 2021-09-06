import React from "react"
import "./Input.css"

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched;
}

const Input = props => {
    const cls = [
        'Input',
        props.inputClassName
    ];

    const inputType = props.type || "text";
    const htmlFor = `${inputType}-${Math.random()}`

    if (isInvalid(props)) {
        cls.push('invalid')
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                id={htmlFor}
                type={inputType}
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
            {
                isInvalid(props)
                    ? <span>{props.errorMessage}</span>
                    : null
            }
        </div>
    )
}

export default Input