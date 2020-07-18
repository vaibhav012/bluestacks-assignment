import React from 'react';

function CustomDatepicker({ value, onClick }) {
    return (
        <span className="campaign-schedule" onClick={onClick}>
            <img src="./calendar.png" className="campaign-inline-icons" alt="campaign-dateicon"/>
            Schedule Again
        </span>
    )
}

export default CustomDatepicker;
