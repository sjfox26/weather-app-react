import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import WeatherNow from './containers/WeatherNow/WeatherNow';
import Forecast from './containers/Forecast/Forecast';

console.log(process.env.REACT_APP_CURRENT_WEATHER_KEY);

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
                <Route path="/forecast" component={Forecast} />
                <Route path="/" component={WeatherNow} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
