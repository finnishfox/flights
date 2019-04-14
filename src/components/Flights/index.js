import Flights from "./Flights";
import {connect} from 'react-redux';
import {getArrivals,getDepartures} from "./Flights.selectors";
import {getFlightsList} from "./Flights.actions";

const mapStateToProps = state => ({
    arrivals: getArrivals(state),
    departures:getDepartures(state)
});

const mapDispatchToProps = {
    getFlightsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Flights);