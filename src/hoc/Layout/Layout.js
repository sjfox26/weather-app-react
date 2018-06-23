import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';

class Layout extends Component {

    render () {
        return (
            <Aux>
                <div>Toolbar, SideDrawer, Backdrop</div>
                <div className={classes.Graphic}>
                    Cool Weather App
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