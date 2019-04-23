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
        return moment(date).format("H:mm");
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
            const reg = new RegExp(searchQuery, 'ig');
            let filteredFlights = flights.filter(flight => {
                const flightNumbers = flight.codeShareData.map(element => element.codeShare);
                return flightNumbers.includes(searchQuery);
            });
            if (filteredFlights.length === 0) {
                filteredFlights = flights.filter(flight => {
                    if ((this.state.currentTab === 'departures')) {
                        return reg.test(flight['airportToID.city_en']);
                    }
                    return reg.test(flight['airportFromID.city_en']);
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
                        <td className="Flights__data Flights__time">{this.getTime(date)}</td>
                        <td className="Flights__data Flights__city">{city}</td>
                        <td className="Flights__data Flights__status">{status}</td>
                        {<td className="Flights__data Flights__airlines">
                            <ul>
                                {airlines.map(airline => <li key={uuidv1()}>{airline}</li>)}
                            </ul>
                        </td>}
                        {<td className="Flights__data Flights__flight-number-field">
                            <ul>
                                {flightNumbers.map(flightNum =>
                                    <li
                                        className="Flights__flight-number"
                                        key={uuidv1()}>{flightNum}
                                    </li>)}
                            </ul>
                        </td>}
                        <td className="Flights__data Flights__gate">{flight.gateNo}</td>
                        <td className="Flights__data Flights__reminder">
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
                        <svg className="Flights__departure-icon"
                             viewBox="0 0 40 28"
                             version="1.1"
                             xmlns="http://www.w3.org/2000/svg">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g transform="translate(-1.000000, -1.000000)" fill="#FFFFFF" fillRule="nonzero"
                                   className="Flights__plane-icon">
                                    <g>
                                        <path
                                            d="M40.9190312,14.2925525 C40.731055,13.5210761 40.2396434,12.8581323 39.5561585,12.4539552 C38.8726735,12.0497781 38.0549837,11.9385881 37.2883912,12.1455827 L26.8096581,15.0218819 L13.1945082,2 L9.38678826,3.03046545 L17.5564785,17.5510243 L7.75204986,20.2442408 L3.86129243,17.1278331 L1,17.9171897 L4.59162231,24.3200818 L6.11030829,27.0112974 L9.26373268,26.1409043 L19.7414654,23.2656055 L28.3253427,20.9165445 L38.8070772,18.0372439 C40.4055057,17.5625364 41.3397513,15.9060318 40.9190312,14.2925525 Z"
                                            transform="translate(21.009879, 14.505649) rotate(-4.012171) translate(-21.009879, -14.505649) "></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        Departures
                    </button>
                    <button
                        className={this.state.currentTab === 'arrivals' ? 'Flights__button Flights__button--active' : 'Flights__button'}
                        onClick={() => this.changeCurrentTab('arrivals')}>
                        <svg className="Flights__departure-icon"
                             viewBox="0 0 40 28"
                             version="1.1"
                             xmlns="http://www.w3.org/2000/svg">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g transform="translate(-1.000000, -4.000000)" fill="#FFFFFF" fillRule="nonzero"
                                   className="Flights__plane-icon">
                                    <g>
                                        <path
                                            d="M43.8940167,20.2848496 C43.7061583,19.5138567 43.2150547,18.8513283 42.531998,18.4474045 C41.8489414,18.0434806 41.031764,17.9323603 40.2656518,18.1392252 L29.793485,21.013722 L16.1868667,8 L12.3815328,9.02981973 L20.5461037,23.5412796 L10.7478188,26.2328084 L6.85949946,23.1183536 L4,23.9072155 L7.5893717,30.3060954 L9.10710602,32.9956246 L12.2585544,32.1257769 L22.7297214,29.2522799 L31.3082198,26.9046908 L41.7833862,24.0271945 C43.3808131,23.5527844 44.3144732,21.8973179 43.8940167,20.2848496 Z"
                                            transform="translate(23.997341, 20.497812) rotate(27.974730) translate(-23.997341, -20.497812) "></path>
                                    </g>
                                </g>
                            </g>
                        </svg>

                        Arrivals
                    </button>
                </nav>
                <nav className="Flights__dates-navigation">
                    <div className="Flights__calendar">
                        <p className="Flights__current-date">{moment(this.state.currentDate).format('DD/MM')}</p>
                        <div className="Flights__calendar-wrapper">
                            <svg className="Flights__calendar-icon"
                                 viewBox="0 0 96 86" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="calendar" fill="#ffffff" fillRule="nonzero">
                                        <path
                                            d="M85.5,7.4 L75.5,7.4 L75.5,11.4 C75.5,14.9 72.6,17.8 69.1,17.8 C65.6,17.8 62.7,15 62.7,11.4 L62.7,7.4 L33.2,7.4 L33.2,11.4 C33.2,14.9 30.4,17.8 26.8,17.8 C23.3,17.8 20.4,15 20.4,11.4 L20.4,7.4 L10.4,7.4 C4.9,7.4 0.4,11.9 0.4,17.4 L0.4,75.6 C0.4,81.1 4.9,85.6 10.4,85.6 L85.4,85.6 C90.9,85.6 95.4,81.1 95.4,75.6 L95.4,17.4 C95.5,11.9 91,7.4 85.5,7.4 Z M90,75.6 C90,78.1 88,80.1 85.5,80.1 L10.5,80.1 C8,80.1 6,78.1 6,75.6 L6,29.3 L90,29.3 L90,75.6 Z"
                                            id="Shape"></path>
                                        <path
                                            d="M26.9,14.2 C28.4,14.2 29.6,13 29.6,11.5 L29.6,3.2 C29.6,1.7 28.4,0.5 26.9,0.5 C25.4,0.5 24.2,1.7 24.2,3.2 L24.2,11.5 C24.1,13 25.4,14.2 26.9,14.2 Z"
                                            id="Shape"></path>
                                        <path
                                            d="M69.1,14.2 C70.6,14.2 71.8,13 71.8,11.5 L71.8,3.2 C71.8,1.7 70.6,0.5 69.1,0.5 C67.6,0.5 66.4,1.7 66.4,3.2 L66.4,11.5 C66.4,13 67.6,14.2 69.1,14.2 Z"
                                            id="Shape"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className="Flights__navigation-wrapper">
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
                    </div>
                </nav>
                <table className="Flights__table">
                    <thead className="Flights__thead">
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