import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import axios from 'axios';
import classes from './WeatherNow.css';


class WeatherNow extends Component {

    state = {
        weather_description: '',
        temp: null,
        humidity: null,
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

    search = (query = 'Chicago') => {
        let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + query + '&APPID=' + process.env.REACT_APP_CURRENT_WEATHER_KEY;
        axios.get(url)
            .then(res => {
                console.log(res.data);
                console.log(res.data.weather[0].description);
                console.log(res.data.main.temp);

                const newDescription = res.data.weather[0].description;
                const newTemp = res.data.main.temp;
                const newHumidity = res.data.main.humidity;
                const cityName = res.data.name;
                this.setState({
                    //...this.state,
                    weather_description: newDescription,
                    temp: newTemp,
                    humidity: newHumidity,
                    city: cityName
                });


            })
    }



    render () {


        return (
            <Aux>
                <div className={classes.WeatherNow}>
                    <h2>Weather Search</h2>
                    <div>
                        <h4>The Current Weather in: {this.state.city}</h4>
                        <p>Conditions: <span style={{textTransform: 'capitalize'}}>{this.state.weather_description}</span></p>
                        <p>Temperature: {(9/5 * (this.state.temp - 273) + 32).toFixed(1)} °F</p>
                        <p>Humidity: {this.state.humidity}%</p>
                        <br/>
                        <input type="text" placeholder="Search City..." onChange={this.typingInputHandler}></input>
                        <button onClick={this.updateSearch}>Search</button>
                    </div>
                </div>

            </Aux>

        );
    }
}

export default WeatherNow;