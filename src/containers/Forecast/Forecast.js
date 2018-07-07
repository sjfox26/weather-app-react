import React, { Component } from 'react';
// import axios from 'axios';
import Aux from '../../hoc/Aux/Aux';
import { connect } from 'react-redux';

import classes from './Forecast.css';
import Day from "../../components/Day/Day";
import * as actions from '../../store/actions/index';


class Forecast extends Component {

    state = {
        userInput: '',
        keyCount: 0
    }

    componentDidMount () {

        // this.updateSearch();
        this.props.onInitData();


    }

    typingInputHandler = ( event ) => {
        //event.preventDefault();

        this.setState( {
            //...this.state,
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
                <p>The Next 5 Days in: <b>{this.props.retrievedData.city.name}</b></p>
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
                    {/*<h4>The 5-Day Forecast for: {this.state.city}</h4>*/}
                    {city}
                </div>

                <div className={classes.Forecast}>
                    {forecast}
                    {/*<Day testProp={this.state.test} testListProp={this.state.testList} />*/}

                    {/*<Day weekday={this.state.data[0]} conditions={this.state.data[1]} highTemp={this.state.data[2]} lowTemp={this.state.data[3]} icon={this.state.data[4]}/>
                    <Day weekday={this.state.data[5]} conditions={this.state.data[6]} highTemp={this.state.data[7]} lowTemp={this.state.data[8]} icon={this.state.data[9]}/>
                    <Day weekday={this.state.data[10]} conditions={this.state.data[11]} highTemp={this.state.data[12]} lowTemp={this.state.data[13]} icon={this.state.data[14]}/>
                    <Day weekday={this.state.data[15]} conditions={this.state.data[16]} highTemp={this.state.data[17]} lowTemp={this.state.data[18]} icon={this.state.data[19]}/>
                    <Day weekday={this.state.data[20]} conditions={this.state.data[21]} highTemp={this.state.data[22]} lowTemp={this.state.data[23]} icon={this.state.data[24]}/>*/}

                </div>

                <div className={classes.Search}>
                    <input type="text" placeholder="Search City..." onChange={this.typingInputHandler}></input>
                    <button onClick={() => { this.props.onChangeCity(this.state.userInput) }}>Search</button>
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