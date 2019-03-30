import React from 'react';
import classes from './SearchButton.css';

const SearchButton = (props) => {
  return (
    <div>
      <input className={classes.Input} type="text" placeholder="Search City..." onChange={props.onTyping}/>
      <button className={classes.Button} onClick={props.onButtonPress}>Search</button>
    </div>
  );
}

export default SearchButton;