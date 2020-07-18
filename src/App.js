import React from 'react';
import './App.css';
import Header from './components/header.js';
import Navigation from './components/navigation.js';

function App() {
    return (
        <div className="App">
            <Header/>
            <div className="body-container">
                <h1>Manage Campaigns</h1>
                <Navigation/>
            </div>
        </div>
    );
}
export default App;
