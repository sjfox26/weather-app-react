import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import WeatherNow from './containers/WeatherNow/WeatherNow';

console.log(process.env.REACT_APP_CURRENT_WEATHER_KEY);

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <WeatherNow />
        </Layout>
      </div>
    );
  }
}

export default App;
