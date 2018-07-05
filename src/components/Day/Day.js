import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './Day.css';



const Day = (props) => {

    const icon = `http://openweathermap.org/img/w/${props.icon}.png`;

    const turnDatetoWeekday = (date) => {

        let dayString = new Date(date);

        let weekday = new Array(7);
        weekday[0] =  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        return weekday[dayString.getDay()];
    };

    let x = props.testProp;
    console.log(x);

    let y = props.testListProp;
    console.log(y);





    return (
        <Aux>
            <div className={classes.Day}>

                {/*<div><img src={icon}></img></div>
                <div>{turnDatetoWeekday(props.weekday)}</div>
                <div>Conditions: <span style={{textTransform: 'capitalize'}}>{props.conditions}</span></div>*/}
                <div>High: {(9/5 * (props.highTemp - 273) + 32).toFixed(1)} °F</div>
                <div>Low: {(9/5 * (props.lowTemp - 273) + 32).toFixed(1)} °F</div>
            </div>
        </Aux>
    );
}


export default Day;