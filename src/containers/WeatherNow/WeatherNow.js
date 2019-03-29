import React, { Component } from 'react';
import axios from 'axios';

import Aux from '../../hoc/Aux/Aux';
import CurrentWeatherBox from '../../components/CurrentWeatherBox/CurrentWeatherBox';
import classes from './WeatherNow.css';



class WeatherNow extends Component {

    state = {
        weather_description: '',
        temp: null,
        humidity: null,
        city: '',
        icon: '',
        userInput: 'Chicago'
    }

    componentDidMount () {
        this.updateSearch();

    }

    updateSearch = () => {
        this.search(this.state.userInput);
    }

    search = (query) => {
        let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + query + '&APPID=' + process.env.REACT_APP_CURRENT_WEATHER_KEY;
        axios.get(url)
            .then(res => {
                console.log(res.data);

                const iconNumber = res.data.weather[0].icon;
                const icon = `http://openweathermap.org/img/w/${iconNumber}.png`;
                const newDescription = res.data.weather[0].description;
                const newTemp = res.data.main.temp;
                const newHumidity = res.data.main.humidity;
                const cityName = res.data.name;
                this.setState({
                    weather_description: newDescription,
                    temp: newTemp,
                    humidity: newHumidity,
                    city: cityName,
                    icon: icon,
                    userInput: query
                });
            })
    }

    typingInputHandler = ( event ) => {
      this.setState( {
        userInput: event.target.value
      })
    }

    render () {
        return (
            <Aux>
                <div className={classes.WeatherNow}>
                    <h2>The Weather Now</h2>
                    <CurrentWeatherBox
                      city={this.state.city}
                      icon={this.state.icon}
                      description={this.state.weather_description}
                      temp={this.state.temp}
                      humidity={this.state.humidity}
                      onTyping={this.typingInputHandler}
                      onButtonPress={this.updateSearch}  />
                </div>
            </Aux>
        );
    }
}

export default WeatherNow;