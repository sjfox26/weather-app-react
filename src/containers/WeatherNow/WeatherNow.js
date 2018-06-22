import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import axios from 'axios';


class WeatherNow extends Component {

    state = {
        weather_description: '',
        temp: null
    }

    componentDidMount () {
        //let url = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=' + process.env.REACT_APP_CURRENT_WEATHER_KEY;
        let url = 'http://api.openweathermap.org/data/2.5/weather?q=London&APPID=' + process.env.REACT_APP_CURRENT_WEATHER_KEY;
        axios.get(url)
            .then(res => {
                //console.log(res.data.city.name);
                console.log(res.data.weather[0].description);
                console.log(res.data.main.temp);

                const newDescription = res.data.weather[0].description;
                const newTemp = res.data.main.temp;
                this.setState({
                    weather_description: newDescription,
                    temp: newTemp
                });


            })
    }

    render () {
        return (
            <Aux>
                <div>The Current Weather...</div>
                <div>
                    <p>{this.state.weather_description}</p>
                    <p>{this.state.temp}</p>
                    <p>{(9/5 * (this.state.temp - 273) + 32).toFixed(2)}</p>
                </div>
            </Aux>

        );
    }
}

export default WeatherNow;