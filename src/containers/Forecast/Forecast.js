import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Day from "../../components/Day/Day";
import * as actions from '../../store/actions/index';
import classes from './Forecast.css';


class Forecast extends Component {

    state = {
        userInput: '',
        keyCount: 0
    }

    componentDidMount () {
        this.props.onInitData();
    }

    typingInputHandler = ( event ) => {
        this.setState( {
            userInput: event.target.value
        })
    }

    //https://github.com/Gigacore/react-weather-forecast/blob/master/src/components/ForecastTiles.js
    //// "Filters the data by date and returns an Object containing a list of 5-day forecast." ^^

    groupByDays = (data) => {
        return (data.reduce((list, item) => {
            const forecastDate = item.dt_txt.substr(0,10);
            list[forecastDate] = list[forecastDate] || [];
            list[forecastDate].push(item);

            return list;
        }, {}));
    };

    getInfo = (data, min=[], max=[]) => {

        data.map(item => {
            max.push(item.main.temp_max);
            min.push(item.main.temp_min);
        });

        const minMax = {
            min: Math.min(...min),
            max: Math.max(...max)
        };

        let m = minMax.max;
        console.log(m);

        let minimum = minMax.min;
        console.log(minimum);

        //the fourth element will be the icon from midday
        let icon = `https://openweathermap.org/img/w/${data[4].weather[0].icon}.png`;
        console.log(icon);

        let descrip = data[4].weather[0].description;
        console.log(descrip);

        let day = data[0].dt_txt;
        console.log(day);

        return (
            <Day key={m} highTemp={m} lowTemp={minimum} icon={icon} conditions={descrip} weekday={day} />
        );
    }


    render () {
        let city = <p>City can't be loaded</p>;

        let forecast = <p>Sorry, weather data is unavailable at this time</p>

        if (this.props.retrievedData) {
            city = (
                <p>The Next Five Days in: <b>{this.props.retrievedData.city.name}</b></p>
            );

            //returns the five arrays of 8 arrays
            //the dates are the keys and as such aren't returned here
            let forecastDays = Object.values(this.groupByDays(this.props.retrievedData.list));

            const fiveDays = forecastDays.length > 5 ? forecastDays.slice(1, 6) : forecastDays;

            forecast = fiveDays.map((item) => {
                return (this.getInfo(item));
            });
        }




        return (
            <Aux>
                <div className={classes.FiveDay}>
                    {city}
                </div>

                <div className={classes.Forecast}>
                    {forecast}
                </div>

                <div className={classes.Search}>
                    <input className={classes.Input} type="text" placeholder="Search City..." onChange={this.typingInputHandler}></input>
                    <button className={classes.Button} onClick={() => { this.props.onChangeCity(this.state.userInput) }}>Search</button>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        retrievedData: state.weather
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitData: () => dispatch(actions.initData()),
        onChangeCity: (city) => dispatch(actions.changeCity(city))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);