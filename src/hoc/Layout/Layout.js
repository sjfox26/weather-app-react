import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {

    render () {
        return (
            <Aux>
                <Toolbar />
                <div className={classes.Graphic}>
                    <div className={classes.Sun}></div>
                    <div className={classes.Grass}></div>
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>

        );
    }
}

export default Layout;