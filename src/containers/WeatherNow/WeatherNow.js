import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import axios from 'axios';
import classes from './WeatherNow.css';



class WeatherNow extends Component {

    state = {
        weather_description: '',
        temp: null,
        humidity: null,
        city: '',
        icon: ''
    }

    componentDidMount () {
        this.updateSearch();

    }

    typingInputHandler = ( event ) => {
        this.setState( {
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

                const iconNumber = res.data.weather[0].icon;
                const icon = `http://openweathermap.org/img/w/${iconNumber}.png`;
                const newDescription = res.data.weather[0].description;
                const newTemp = res.data.main.temp;
                const newHumidity = res.data.main.humidity;
                const cityName = res.data.name;
                this.setState({
                    //...this.state,
                    weather_description: newDescription,
                    temp: newTemp,
                    humidity: newHumidity,
                    city: cityName,
                    icon: icon
                });
            })
    }

    render () {
        return (
            <Aux>
                e<div className={classes.WeatherNow}>
                    <h2>The Weather Now</h2>
                    <div>
                        <p>The Current Weather in: <b>{this.state.city}</b></p>
                        <div className={classes.Box}>
                            <div>
                                <img src={this.state.icon}></img>
                            </div>
                            <p><b>Conditions: </b><span style={{textTransform: 'capitalize'}}>{this.state.weather_description}</span></p>
                            <p><b>Temperature: </b>{(9/5 * (this.state.temp - 273) + 32).toFixed(1)} °F</p>
                            <p><b>Humidity: </b>{this.state.humidity}%</p>
                        </div>
                        <br/>
                        <input className={classes.Input} type="text" placeholder="Search City..." onChange={this.typingInputHandler}></input>
                        <button className={classes.Button} onClick={this.updateSearch}>Search</button>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default WeatherNow;