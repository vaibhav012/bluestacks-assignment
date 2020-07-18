import React from 'react';
import logo from '../logo.png';
import '../styles/header.css';

function Header() {
    return (
        <div className="header-container">
            <img src={logo} className="header-icon" alt="bluestacks_logo"/>
        </div>
    )
}

export default Header;
