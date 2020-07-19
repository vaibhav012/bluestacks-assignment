import React from 'react';
import Strings from '../helpers/localization.js'

//This is just a view for customised datepicker used via DatePicker in campaigns.js
const CustomDatepicker = ({ value, onClick }) => (
    <span className="campaign-schedule" onClick={onClick}>
        <img src="./icons/calendar.png" className="campaign-inline-icons" alt="campaign-dateicon"/>
        {Strings.schedule}
    </span>
)

export default CustomDatepicker;
