import React from 'react';
import {Provider} from 'react-redux';
import store from '../../store';
import Search from "../Search";
import 'reset-css';
import './App.scss';
import Flights from "../Flights";

export default function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <main className="App__content">
                    <Search/>
                    <Flights/>
                </main>
            </Provider>
        </div>
    );
}

