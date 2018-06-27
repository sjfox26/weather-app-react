import React, { Component } from 'react';
import axios from 'axios';
import Aux from '../../hoc/Aux/Aux';

import classes from './Forecast.css';
import Day from "../../components/Day/Day";


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

                console.log(res.data);

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