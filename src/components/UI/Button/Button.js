import React from "react";
import "./Button.css"

const Button = props => {
    const cls = [
        'Button',
        props.type,
        props.classes
    ]

    return (
        <button className={cls.join(' ')} disabled={props.disabled} onClick={props.onClick}>{props.children}</button>
    )
}

export default Button;
