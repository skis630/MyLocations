import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './nav.css';


class Navigation extends React.Component {
    render() {
        return (
                <Navbar bg="primary" variant="light" fixed="bottom">
                    <Nav className="mr-auto" variant="pills">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Link as={Link} to="/locations">Locations</Nav.Link>
                    </Nav>
                </Navbar> 
        )
    }
}

export default Navigation;

