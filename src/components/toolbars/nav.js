import React from 'react';
import { Link, Router } from 'react-router-dom';
import './nav.css';


class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <nav role="navigation">
                    <Link to="/categories">Categories </Link>
                    <Link to="/locations">Locations </Link>
                </nav>            
        )
    }
}

export default Nav;