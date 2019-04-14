import React from "react";
import './Flights.scss';

class Flights extends React.Component {

    state = {currentTab: 'departures'};

    componentDidMount() {
        this.loadFlights('14-04-2019');
    }

    loadFlights = (date) => {
        const {getFlightsList} = this.props;
        getFlightsList(date);
    };

    getTime = (date) => {
        return `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`
    };

    changeCurrentTab = (tab) => {
        this.setState({currentTab: tab});

    };

    showFlights = () => {
        const {departures, arrivals} = this.props;
        let flights = [];
        if (this.state.currentTab === 'departures') {
            flights = departures
        } else {
            flights = arrivals;
        }
        return flights.map(flight => {
            let date = '';
            let city = '';
            if (this.state.currentTab === 'departures') {
                date = new Date(flight.timeDepExpectCalc);
                city = flight['airportToID.city_en']
            } else {
                date = new Date(flight.timeArrExpectCalc);
                city = flight['airportFromID.city_en'];
            }
            let status = '';
            switch (flight.status) {
                case 'DP':
                    status = `Departed at ${this.getTime(new Date(flight.timeDepFact))}`;
                    break;
                case 'ON':
                    status = 'On time';
                    break;
                case 'CK':
                    status = 'Check-in';
                    break;
                case 'LN':
                    status = `Landed at ${this.getTime(new Date(flight.timeLandFact))}`;
                    break;
                default:
                    status = '';
                    break;
            }
            return (
                <tr key={flight.ID} className="Flights__table-row">
                    <td className="Flights__terminal">{flight.term}</td>
                    <td className="Flights__data">{this.getTime(date)}</td>
                    <td className="Flights__data">{city}</td>
                    <td className="Flights__data">{status}</td>
                    <td className="Flights__data">{flight.airline.en.name}</td>
                    <td className="Flights__data">{flight.fltNo}</td>
                    <td className="Flights__data">{flight.gateNo}</td>
                </tr>)
        });
    };

    render() {
        return (
            <article className="Flights">
                <nav className="Flights__tabs">
                    <button
                        className={this.state.currentTab==='departures'?'Flights__button Flights__button--active':'Flights__button'}
                        onClick={() => this.changeCurrentTab('departures')}>
                        Departures
                    </button>
                    <button
                        className={this.state.currentTab==='arrivals'?'Flights__button Flights__button--active':'Flights__button'}
                        onClick={() => this.changeCurrentTab('arrivals')}>
                        Arrivals
                    </button>
                </nav>
                <table className="Flights__table">
                    <thead>
                    <tr>
                        <th scope="col" className="Flights__table-header">Terminal</th>
                        <th scope="col" className="Flights__table-header">Time</th>
                        <th scope="col" className="Flights__table-header">Destination</th>
                        <th scope="col" className="Flights__table-header">Status</th>
                        <th scope="col" className="Flights__table-header">Airline</th>
                        <th scope="col" className="Flights__table-header">Flight</th>
                        <th scope="col" className="Flights__table-header">Gate</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.showFlights()}
                    </tbody>
                </table>
            </article>
        );
    }
}

export default Flights;