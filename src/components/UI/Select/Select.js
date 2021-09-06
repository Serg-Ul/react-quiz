import React from "react"
import "./Select.css"

const Select = props => {
    const cls = [
        "Select"
    ]

    const htmlFor = `${props.label}-${Math.random()}`

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                {
                    props.options.map((option, index) => {
                    return (
                        <option
                            key={index}
                            value={option.value}
                        >
                            {option.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select