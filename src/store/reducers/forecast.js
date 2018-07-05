const initialState = {
    weather: undefined
};

const setData = (state, action) => {
    return {
        ...state,
        weather: action.data
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATA': return setData(state, action);
        default: return state;
    }
};

export default reducer;