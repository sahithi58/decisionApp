import React from 'react';
import {Link} from "react-router-dom";

const TopMenu = ({func, buttonName}) =>
    <div className="header">
        <a href="#default" className="logo"><b>She</b></a>
        <div className="header-right">
            <a onClick={func}>{buttonName}</a>
            <Link to="/contact">Contact</Link>
            <a href="#about">About</a>
        </div>
    </div>

export default TopMenu
