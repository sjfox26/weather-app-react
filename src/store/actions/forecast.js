import axios from 'axios';

export const initData = () => {
    return dispatch => {
        console.log('hi from forecast actions file');
        let url = 'http://api.openweathermap.org/data/2.5/forecast?q=Chicago&APPID=' + process.env.REACT_APP_CURRENT_WEATHER_KEY;
        axios.get(url)
            .then(response => {
                console.log(response.data);
                dispatch(setData(response.data));
            })
    };
};

export const changeCity = (city) => {
    return dispatch => {
        console.log('hi from forecast actions change city function');
        console.log(city);
        let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=` + process.env.REACT_APP_CURRENT_WEATHER_KEY;
        axios.get(url)
            .then(response => {
                console.log(response.data);
                dispatch(setData(response.data));
            })
    };
};


export const setData = (data) => {
    return {
        type: 'SET_DATA',
        data: data
    };
};