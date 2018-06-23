import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import axios from 'axios';


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

    deleteLetterHandler = ( index ) => {
        const text = this.state.userInput.split('');
        text.splice(index, 1);
        const newText = text.join('');
        this.setState({
            //...this.state,
            userInput: newText
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
                <div>Weather Search</div>
                <div>
                    <h3>The Current Weather in: {this.state.city}</h3>
                    <p>Conditions: <span style={{textTransform: 'capitalize'}}>{this.state.weather_description}</span></p>
                    <p>Temperature: {(9/5 * (this.state.temp - 273) + 32).toFixed(2)} Fahrenheit</p>
                    <p>Humidity: {this.state.humidity}%</p>
                    <input type="text" onChange={this.typingInputHandler}></input>
                    <button onClick={this.updateSearch}>Search</button>
                </div>

            </Aux>

        );
    }
}

export default WeatherNow;