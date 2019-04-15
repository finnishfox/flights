export const defaultState = {
    arrivals: [],
    departures:[]
};

export default function flights(initialState = defaultState, action) {
    switch (action.type) {
        case "FLIGHTS_LOADED":
            return {
                arrivals: [
                    ...initialState.arrivals,
                    ...action.payload.arrivals
                ],
                departures: [
                    ...initialState.departures,
                    ...action.payload.departures
                ],
            };
        default:
            return initialState;
    }
}