import React from 'react';
import classes from  './CurrentWeatherBox.css';

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
      <br/>
      <input className={classes.Input} type="text" placeholder="Search City..." onChange={props.onTyping}/>
      <button className={classes.Button} onClick={props.onButtonPress}>Search</button>
    </div>
  );
}

export default CurrentWeatherBox;