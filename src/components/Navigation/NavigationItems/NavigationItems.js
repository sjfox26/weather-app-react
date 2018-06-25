import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Weather Now</NavigationItem>
        <NavigationItem link="/forecast">Forecast</NavigationItem>
    </ul>
);

export default navigationItems;