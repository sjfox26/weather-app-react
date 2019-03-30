import React, { Component } from 'react';
import axios from 'axios';

import Aux from '../../hoc/Aux/Aux';
import Day from '../../components/Day/Day';
import classes from './Forecast.css';
import SearchButton from '../../components/SearchButton/SearchButton';


class Forecast extends Component {

  state = {
      userInput: '',
      data: undefined
  }

  componentDidMount () {
      this.onInitData();
  }

  onInitData = async () => {
    let url = 'http://api.openweathermap.org/data/2.5/forecast?q=Chicago&APPID=' + process.env.REACT_APP_CURRENT_WEATHER_KEY;

    await axios.get(url)
      .then(response => {
        this.setState({data: response.data})
      })
  }

  onButtonPress = () => {
    this.changeCitay(this.state.userInput);
  }

  changeCitay = async (city) => {
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=` + process.env.REACT_APP_CURRENT_WEATHER_KEY;

    await axios.get(url)
      .then(response => {
        this.setState({data: response.data});
      })
  };

  typingInputHandler = ( event ) => {
    this.setState( {
      userInput: event.target.value
    })
  }

  //https://github.com/Gigacore/react-weather-forecast/blob/master/src/components/ForecastTiles.js
  //// "Filters the data by date and returns an Object containing a list of 5-day forecast." ^^
  // the value of the Object's properties is an array containing subarrays of weather info (data every 3 hours)
  // ex: called on Monday at 3:23pm...
  // { Monday: [ [9p] ], Tuesday: [ [12a], [3a], [...], [], [], [], [], [] ], Wednesday: [ [], [], [], [], [], [], [], [] ], Thursday: [ [], [], [], [], [], [], [], [] ],
  //   Friday: [ [], [], [], [], [], [], [], [...] ], Sat: [ [12], [3a], [6a], [9a], [12p], [3p], [6p] ] }
  groupByDays = (data) => {
      return (data.reduce((list, item) => {
          const forecastDate = item.dt_txt.substr(0,10);
          list[forecastDate] = list[forecastDate] || [];
          list[forecastDate].push(item);

          return list;
      }, {}));
  };

  //takes each day's array of hourly subarrays
  getInfoForDay = (dayData, min=[], max=[]) => {

      //collect min and max temperature data
      dayData.map(hourData => {
          max.push(hourData.main.temp_max);
          min.push(hourData.main.temp_min);
      });

      //determine the min and the max temperature for each day
      const minMax = {
          min: Math.min(...min),
          max: Math.max(...max)
      };

      //store the min and max temp
      let m = minMax.max;
      let minimum = minMax.min;

      //the fifth element should ideally be the icon from afternoon
      //TO DO: fix the groupByDays method if possible
      let icon = `https://openweathermap.org/img/w/${dayData[4].weather[0].icon}.png`;

      //store the description
      let descrip = dayData[4].weather[0].description;

      //store the name of the day
      let day = dayData[0].dt_txt;

      let dayInfo = (
          <Day key={m} highTemp={m} lowTemp={minimum} icon={icon} conditions={descrip} weekday={day} />
      );

      return dayInfo;
  }



  render () {
      let city = <p>City can't be loaded</p>;
      let forecast = <p>Sorry, weather data is unavailable at this time</p>

      if (this.state.data) {
          city = (
              <p>The Next Five Days in: <b>{this.state.data.city.name}</b></p>
          );

          //returns five or six arrays, each containing subarrays of weather info (data every 3 hours)
          let forecastDays = Object.values(this.groupByDays(this.state.data.list));

          //this ignores current day info
          //TO DO: fix to account for potential shortage of info for 5th Day of Forecast (as of now we get 40 total arrays depending on when data was fetched)
          //example above groupByDays function
          const days = forecastDays.length > 5 ? forecastDays.slice(1, 6) : forecastDays;

          //day is an array of subarrays- subarrays contain hourly weather data
          //returns a Day Component for each of the 5 days
          forecast = days.map((day) => {
              return (this.getInfoForDay(day));
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
                  <SearchButton onTyping={this.typingInputHandler} onButtonPress={this.onButtonPress} />
              </div>
          </Aux>
      );
  }
}


export default Forecast;