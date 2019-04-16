import React from "react";
import './Flights.scss';
import moment from "moment";
import uuidv1 from 'uuid/v1';

class Flights extends React.Component {

    state = {currentTab: 'departures', currentDate: moment()};

    componentDidMount() {
        this.loadFlights(moment());
    }

    loadFlights = (date) => {
        const {getFlightsList} = this.props;
        getFlightsList(date.format('DD-MM-YYYY'));

    };

    getTime = (date) => {
        return moment(date).format("HH:mm");
    };

    changeCurrentTab = (tab) => {
        this.setState({currentTab: tab});

    };

    sendNotification = async (flight) => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const now = moment();
            let time = '';
            if (this.state.currentTab === 'departures') {
                time = moment(flight.timeDepExpectCalc);
            } else {
                time = moment(flight.timeToStand);
            }
            let duration = moment.duration(time.diff(now));
            const minutesBeforeReminder = duration.subtract(moment.duration(3, 'hours')).as('minutes');
            const msBeforeReminder = minutesBeforeReminder * 60 * 1000;
            setTimeout(() => new Notification('Taxi reminder', {
                body: "3 hours before flight. Time to order a taxi!",
            }), msBeforeReminder)
        }
    };

    isMoreThanThreeHoursBeforeFlight = (flight) => {
        const now = moment();
        let time = '';
        if (this.state.currentTab === 'departures') {
            time = moment(flight.timeDepExpectCalc);
        } else {
            time = moment(flight.timeToStand);
        }
        let duration = moment.duration(time.diff(now));
        return duration.as('hours') > 3;

    };


    showFlights = () => {
        const {departures, arrivals, searchQuery} = this.props;
        let flights = [];
        if (this.state.currentTab === 'departures') {
            flights = departures;
            flights = flights
                .filter(flight => moment(flight.timeDepExpectCalc).isSame(moment(this.state.currentDate), 'day'))
                .sort((a, b) => {
                    if (moment(a.timeDepExpectCalc).isBefore(moment(b.timeDepExpectCalc))) {
                        return -1;
                    } else if (moment(a.timeDepExpectCalc).isAfter(moment(b.timeDepExpectCalc))) {
                        return 1;
                    }
                    return 0;
                })
        } else {
            flights = arrivals;
            flights = flights
                .filter(flight => moment(flight.timeToStand).isSame(moment(this.state.currentDate), 'day'))
                .sort((a, b) => {
                    if (moment(a.timeToStand).isBefore(moment(b.timeToStand))) {
                        return -1;
                    } else if (moment(a.timeToStand).isAfter(moment(b.timeToStand))) {
                        return 1;
                    }
                    return 0;
                })
        }

        if (searchQuery !== '') {
            let filteredFlights = flights.filter(flight => {
                const flightNumbers = flight.codeShareData.map(element => element.codeShare);
                return flightNumbers.includes(searchQuery);
            });
            if (filteredFlights.length === 0) {
                filteredFlights = flights.filter(flight => {
                    if ((this.state.currentTab === 'departures')) {
                        return flight['airportToID.city_en'] === searchQuery;
                    }
                    return flight['airportFromID.city_en'] === searchQuery;
                });
            }
            flights = filteredFlights;
        }
        return flights
            .map(flight => {
                let date = '';
                let city = '';
                if (this.state.currentTab === 'departures') {
                    date = new Date(flight.timeDepExpectCalc);
                    city = flight['airportToID.city_en']
                } else {
                    date = new Date(flight.timeToStand);
                    city = flight['airportFromID.city_en'];
                }
                let status = '';
                switch (flight.status) {
                    case 'DP':
                        status = `Departed at ${this.getTime(new Date(flight.timeTakeofFact))}`;
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
                    case 'BD':
                        status = 'Boarding';
                        break;
                    case 'GC':
                        status = 'Gate closed';
                        break;
                    case 'FR':
                        status = 'In flight';
                        break;
                    default:
                        status = '';
                        break;
                }
                const airlines = flight.codeShareData.map(airline => airline.airline.en.name);
                const flightNumbers = flight.codeShareData.map(element => element.codeShare);
                return (
                    <tr key={flight.ID} className="Flights__table-row">
                        <td className={flight.term === 'A' ? 'Flights__terminal' : 'Flights__terminal Flights__terminal--blue'}>
                            {flight.term}
                        </td>
                        <td className="Flights__data">{this.getTime(date)}</td>
                        <td className="Flights__data">{city}</td>
                        <td className="Flights__data">{status}</td>
                        {<td className="Flights__data">
                            <ul>
                                {airlines.map(airline => <li key={uuidv1()}>{airline}</li>)}
                            </ul>
                        </td>}
                        {<td className="Flights__data">
                            <ul>
                                {flightNumbers.map(flightNum => <li key={uuidv1()}>{flightNum}</li>)}
                            </ul>
                        </td>}
                        <td className="Flights__data">{flight.gateNo}</td>
                        <td>
                            <button
                                className={this.isMoreThanThreeHoursBeforeFlight(flight) ? "Flights__reminder-button" : "Flights__reminder-button Flights__reminder-button--hidden"}
                                onClick={() => this.sendNotification(flight)}>Taxi reminder
                            </button>
                        </td>
                    </tr>)
            });
    };

    render() {
        const yesterday = moment().subtract(1, 'days');
        const tomorrow = moment().add(1, 'days');
        return (
            <article className="Flights">
                <nav className="Flights__tabs">
                    <button
                        className={this.state.currentTab === 'departures' ? 'Flights__button Flights__button--active' : 'Flights__button'}
                        onClick={() => this.changeCurrentTab('departures')}>
                        Departures
                    </button>
                    <button
                        className={this.state.currentTab === 'arrivals' ? 'Flights__button Flights__button--active' : 'Flights__button'}
                        onClick={() => this.changeCurrentTab('arrivals')}>
                        Arrivals
                    </button>
                </nav>
                <nav className="Flights__dates-navigation">
                    <button className="Flights__change-date-button"
                            onClick={() => this.setState({currentDate: yesterday})}>
                        <span className="Flights__date-text">{yesterday.format('DD/MM')}</span>
                        Yesterday
                    </button>
                    <button className="Flights__change-date-button"
                            onClick={() => this.setState({currentDate: moment()})}>
                        <span className="Flights__date-text">{moment().format('DD/MM')}</span>
                        Today
                    </button>
                    <button className="Flights__change-date-button"
                            onClick={() => this.setState({currentDate: tomorrow})}>
                        <span className="Flights__date-text">{tomorrow.format('DD/MM')}</span>
                        Tomorrow
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
                        <th scope="col" className="Flights__table-header"/>
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