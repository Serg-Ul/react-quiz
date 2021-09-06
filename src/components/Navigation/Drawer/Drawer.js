import React, {Component} from "react"
import classes from "./Drawer.module.css"
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

class Drawer extends Component {
    renderLinks = (links) => {
        return links.map((link, index) => (
            <li key={index}>
                <NavLink to={{pathname: link.pathName}} exact={link.exact} activeClassName={classes.active}
                         onClick={this.props.onHideMenu}>
                    {link.pathLink}
                </NavLink>
            </li>
        ));
    }

    render() {
        const cls = [
            classes.Drawer,
            !this.props.isOpen ? classes.close : ''
        ]

        let links = [
            {
                pathName: '/',
                pathLink: 'List of test',
                exact: true
            }
        ]

        if (this.props.isAuthenticated) {
            links.push({
                pathName: '/quiz-creator',
                pathLink: 'Create test',
                exact: false
            });
            links.push({
                pathName: '/logout',
                pathLink: 'Logout',
                exact: false
            });
            // or =>
            // links = [
            //     {
            //         pathName: '/quiz-creator',
            //         pathLink: 'Create test',
            //         exact: false
            //     },
            //     {
            //         pathName: '/logout',
            //         pathLink: 'Logout',
            //         exact: false
            //     }
            // ]
        } else {
            links.push({
                pathName: '/auth',
                pathLink: 'Authorization',
                exact: false
            })
        }

        return (
            <>
                {this.props.isOpen ? <Backdrop onClick={this.props.onHideMenu}/> : null}
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
            </>
        )
    }
}

export default Drawer