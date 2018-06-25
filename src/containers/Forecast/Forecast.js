import React, { Component } from 'react';
import axios from 'axios';

import classes from './Forecast.css';

class Forecast extends Component {


    componentDidMount () {

        let url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + 'Chicago' + '&APPID=' + process.env.REACT_APP_CURRENT_WEATHER_KEY;
        axios.get(url)
            .then(res => {
                console.log(res.data);

            })

    }

    render () {

        return (
            <div className={classes.Forecast}>
                The 5-Day Forecast...
            </div>
        );
    }
}

export default Forecast;