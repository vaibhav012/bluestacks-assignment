import React from 'react';
// import logo from '../logo.png';
import '../styles/header.css';
import {Dropdown} from 'semantic-ui-react';

function Header(props) {
    function changeLanguage(e, data){
        alert(data.value)
    }

    var options=[
        { key: 1, text: 'English', value: 'en' },
        { key: 2, text: 'हिन्दी', value: 'hi' },
    ]

    return (
        <div className="header-container">
            <img src="./logo.png" className="header-icon" alt="bluestacks_logo"/>
            <Dropdown
                style={{color:'white'}}
                onChange={props.setLanguage}
                options={options}
                placeholder='Change Language'
                value={props.language}
          />
        </div>
    )
}

export default Header;
