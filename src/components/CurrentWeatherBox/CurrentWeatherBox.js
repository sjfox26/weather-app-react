import React from 'react';
import classes from  './CurrentWeatherBox.css';
import SearchButton from '../../components/SearchButton/SearchButton';

const convertTemp = (tempToConvert) => {
  return (9/5 * (tempToConvert - 273) + 32).toFixed(1);
}

const CurrentWeatherBox = (props) => {

  return (
    <div>
      <p>The Current Weather in: <b>{props.city}</b></p>
      <div className={classes.Box}>
        <div>
          <img src={props.icon} alt="Weather Icon"/>
        </div>
        <p><b>Conditions: </b><span className={classes.Description}>{props.description}</span></p>
        <p><b>Temperature: </b>{convertTemp(props.temp)} °F</p>
        <p><b>Humidity: </b>{props.humidity}%</p>
      </div>

      <SearchButton onTyping={props.onTyping} onButtonPress={props.onButtonPress} />
    </div>
  );
}

export default CurrentWeatherBox;