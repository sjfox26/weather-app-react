import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import WeatherNow from './containers/WeatherNow/WeatherNow';

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
