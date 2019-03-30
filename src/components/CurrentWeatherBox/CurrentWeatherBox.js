import React from 'react';
import classes from  './CurrentWeatherBox.css';
import SearchButton from '../../components/SearchButton/SearchButton';

const convertTemp = (tempToConvert) => {
  return (9/5 * (tempToConvert - 273) + 32).toFixed(1);
}

const CurrentWeatherBox = (props) => {

  return (
    <div>
      <p>The Current Weather in: <span className={classes.Bold}>{props.city}</span></p>
      <div className={classes.Box}>
        <div>
          <img src={props.icon} alt="Weather Icon"/>
        </div>
        <p><span className={classes.Bold}>Conditions: </span><span className={classes.Description}>{props.description}</span></p>
        <p><span className={classes.Bold}>Temperature: </span>{convertTemp(props.temp)} °F</p>
        <p><span className={classes.Bold}>Humidity: </span>{props.humidity}%</p>
      </div>

      <SearchButton onTyping={props.onTyping} onButtonPress={props.onButtonPress} />
    </div>
  );
}

export default CurrentWeatherBox;