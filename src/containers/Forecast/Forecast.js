import React, { Component } from 'react';
import axios from 'axios';
import Aux from '../../hoc/Aux/Aux';

import classes from './Forecast.css';
import Day from "../../components/Day/Day";
import moment from 'moment';


class Forecast extends Component {

    state = {
        data: [],
        city: ''
    }

    componentDidMount () {

        this.updateSearch();

    }

    typingInputHandler = ( event ) => {
        this.setState( {
            //...this.state,
            userInput: event.target.value
        })
    }


    updateSearch = () => {
        this.search(this.state.userInput);
    }


    search= (query = 'Chicago') => {

        let url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + query + '&APPID=' + process.env.REACT_APP_CURRENT_WEATHER_KEY;
        axios.get(url)
            .then(res => {


                //TODO: Probably should send the whole data object along to Day Component, with these methods, and output JSX where testin map is
                //returns the whole data object
                console.log(res.data);

                //https://github.com/Gigacore/react-weather-forecast/blob/master/src/components/ForecastTiles.js
                //// "Filters the data by date and returns an Object containing a list of 5-day forecast." ^^
                const groupByDays = (data) => {
                    return (data.reduce((list, item) => {
                        const forecastDate = item.dt_txt.substr(0,10);
                        list[forecastDate] = list[forecastDate] || [];
                        list[forecastDate].push(item);

                        return list;
                    }, {}));
                };


                let x = Object.values(groupByDays(res.data.list));
                //returns the five arrays of 8 arrays
                console.log(x);


                const getInfo = (data, min=[], max=[], humidity=[]) => {

                    data.map(item => {
                        max.push(item.main.temp_max);
                        min.push(item.main.temp_min);
                    });

                    const minMax = {
                        min: Math.round(Math.min(...min)),
                        max: Math.round(Math.max(...max)),
                    };

                    let m = minMax.max;
                    console.log(m);

                    let minn = minMax.min;
                    console.log(minn);
                }


                let testin = x.map((item) => {
                   getInfo(item);
                });





                let dataArray = [];

                for (let i = 0; i < 33; i=i+8) {

                    dataArray.push(res.data.list[i].dt_txt);
                    dataArray.push(res.data.list[i].weather[0].description);
                    dataArray.push(res.data.list[i].main.temp_max);
                    dataArray.push(res.data.list[i].main.temp_min);
                    dataArray.push(res.data.list[i].weather[0].icon);

                }

                this.setState({
                    data: dataArray,
                    city: res.data.city.name
                });

               /* let days = [];

                for (let i = 0; i < 33; i=i+8) {

                    days.push = {
                        name: res.data.list[i].dt_txt,
                        descrip: res.data.list[i].weather[0].description,
                        hi: res.data.list[i].main.temp_max,
                        lo: res.data.list[i].main.temp_min
                    };

                }

                this.setState({
                    days: days
                });*/




            })

    }

    render () {

        /*let dayList = '';

        if (this.state.days.length < 1) {
            dayList = (<h1>Loading!</h1>);
        } else {
            dayList = this.state.days.map(day => (
                <Day weekday={day.name} conditions={day.descrip} highTemp={day.hi} lowTemp={day.lo}/>
            ))
        }*/


        return (
            <Aux>
                <div className={classes.FiveDay}>
                    <h4>The 5-Day Forecast for: {this.state.city}</h4>
                </div>

                <div className={classes.Forecast}>
                    <Day weekday={this.state.data[0]} conditions={this.state.data[1]} highTemp={this.state.data[2]} lowTemp={this.state.data[3]} icon={this.state.data[4]}/>
                    <Day weekday={this.state.data[5]} conditions={this.state.data[6]} highTemp={this.state.data[7]} lowTemp={this.state.data[8]} icon={this.state.data[9]}/>
                    <Day weekday={this.state.data[10]} conditions={this.state.data[11]} highTemp={this.state.data[12]} lowTemp={this.state.data[13]} icon={this.state.data[14]}/>
                    <Day weekday={this.state.data[15]} conditions={this.state.data[16]} highTemp={this.state.data[17]} lowTemp={this.state.data[18]} icon={this.state.data[19]}/>
                    <Day weekday={this.state.data[20]} conditions={this.state.data[21]} highTemp={this.state.data[22]} lowTemp={this.state.data[23]} icon={this.state.data[24]}/>
                    {/*{dayList}*/}
                </div>

                <div className={classes.Search}>
                    <input type="text" placeholder="Search City..." onChange={this.typingInputHandler}></input>
                    <button onClick={this.updateSearch}>Search</button>
                </div>

            </Aux>

        );
    }
}

export default Forecast;