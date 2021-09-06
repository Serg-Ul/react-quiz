import React, {Component} from "react"
import classes from "./Layout.module.css"
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import {connect} from "react-redux";

class Layout extends Component {
    state = {
        menu: false
    }

    onHideMenu = () => {
        this.setState({
            menu: false
        })
    }

    onToggleHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                <MenuToggle isOpen={this.state.menu} onToggle={this.onToggleHandler}/>
                <Drawer isAuthenticated={this.props.isAuthenticated} isOpen={this.state.menu} onHideMenu={this.onHideMenu}/>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);