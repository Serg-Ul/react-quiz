import React from "react"
import classes from "./MenuToggle.module.css"

const MenuToggle = props => {
    const cls = [
        classes.MenuToggle,
        'fa'
        //props.isOpen ? classes['open'] : ''
    ];

    if (props.isOpen) {
        cls.push('fa-times');
        cls.push(classes.open)
    } else {
        cls.push('fa-bars');
    }

    return (
        // <div className={cls.join(' ')}
        //      onClick={props.onToggle}>
        //     <span/>
        // </div>
        <i className={cls.join(' ')} onClick={props.onToggle}/>
    )
}

export default MenuToggle