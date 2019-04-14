import axios from 'axios';

export const flightsLoaded = payload => ({
    type: 'FLIGHTS_LOADED',
    payload,
});

export const getFlightsList = (date) => async dispatch => {
        const result = await axios.get(`https://api.iev.aero/api/flights/${date}`);

        const arrivals=result.data.body.arrival;
        const departures = result.data.body.departure;

        const action = flightsLoaded({arrivals:arrivals,departures:departures});
        dispatch(action);
};