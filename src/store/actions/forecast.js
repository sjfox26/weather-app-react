/////KEEPING AROUND IN CASE I DECIDE TO REIMPLEMENT REDUX

import axios from 'axios';

export const initData = () => async (dispatch) => {
        let url = 'http://api.openweathermap.org/data/2.5/forecast?q=Chicago&APPID=' + process.env.REACT_APP_CURRENT_WEATHER_KEY;

        await axios.get(url)
            .then(response => {
                console.log(response.data);
                dispatch(setData(response.data));
            })
};

export const changeCity = city => async (dispatch) => {
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=` + process.env.REACT_APP_CURRENT_WEATHER_KEY;

    await axios.get(url)
      .then(response => {
        console.log(response.data);
        dispatch(setData(response.data));
      })
};

export const setData = (data) => {
    return {
        type: 'SET_DATA',
        data: data
    };
};

