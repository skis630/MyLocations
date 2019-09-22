import React from 'react';
import {Accordion, Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FaSortAlphaDown, FaRegObjectGroup } from 'react-icons/fa';
import './locations.css';
import TopToolbar from './toolbars/topToolbar';
import { store } from '../index';
import Nav from './toolbars/nav.jsx';
import Location from './Location.jsx';
import { sortLoc, groupByCat, revertToLocs } from '../actions/index';


class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.abortController = new AbortController();
        this.state = {
            locations: JSON.parse(localStorage["locations"] || "[]")
        }
        this.sortLocations = this.sortLocations.bind(this);
        this.group = this.group.bind(this);
        this.revert = this.revert.bind(this);

        store.subscribe(() => {
            this.setState({
                locations: store.getState().locations
            })
            localStorage.setItem("locations", JSON.stringify(store.getState().locations));
        })
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    sortLocations() {
        function compare(a, b) {
            // Use toUpperCase() to ignore character casing
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
          
            let comparison = 0;
            if (nameA > nameB) {
              comparison = 1;
            } else if (nameA < nameB) {
              comparison = -1;
            }
            return comparison;
          }
          
        let sorted = JSON.parse(localStorage["locations"] || "[]").sort(compare);
        store.dispatch(sortLoc(sorted));
    }

    group() {
        let groupedLoc = JSON.parse(localStorage["locations"] || "[]").reduce(function(groups, loc) {
            let key = loc.category;
            if (groups[key] == null) groups[key] = [];
          
            groups[key].push(loc);
            return groups;
          }, {});

          store.dispatch(groupByCat(groupedLoc));
    }

    revert() {
        let groups = Object.values(JSON.parse(localStorage["locations"] || "{}"));
        let baseState = [].concat(...groups);
        
        store.dispatch(revertToLocs(baseState));
    }

    render() {
        if (Array.isArray(this.state.locations)) {
            return (
                <div>
                    <TopToolbar display="locations" />
                    <Container fluid>
                        <Row>
                            <h1 className="loc-heading">My Locations</h1>
                        </Row>
                        <Row>
                            <Col md={10} sm={12}>
                                <Accordion className="accord-loc">
                                    {this.state.locations.map((loc, index) => {
                                        return (
                                            <Location
                                                editable={loc.editable}
                                                key={loc.id} id={loc.id}
                                                keyEvent={`${index}`}
                                                address={loc.address}
                                                cat={loc.category} name={loc.name}
                                                lat={loc.lat} long={loc.long}>
                                                {loc.name}
                                            </Location>
                                            )
                                    })}
                                </Accordion>
                            </Col>
                            <Col md={2} sm={12}>
                                <Button className="sort" variant="primary" onClick={this.sortLocations} type="button">
                                    Sort alphabetically <FaSortAlphaDown />
                                </Button>
                                <Button className="group" type="button" onClick={this.group}>
                                    Group by category <FaRegObjectGroup />
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    <Nav />
                </div>
                
               
                    
                    
            )
        } else {

            return (
                <div>
                    <TopToolbar display="locations" />
                    <Container fluid>
                    <Row>
                        <h1 className="loc-heading">My Locations</h1>
                    </Row>
                    <Row>
                    <Col md={10} sm={12}>
                    <Accordion className="accord-loc">
                        {Object.keys(this.state.locations).map((cat, index) => {
                            return (
                            <Card key={index}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={`${index}`}>
                                        {cat}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={`${index}`}>
                                    <Card.Body>
                                        {this.state.locations[cat].map(loc => {
                                            return (
                                            <div key={loc.id}>
                                                <h4>{loc.name}</h4>
                                                <p>{loc.address}</p>
                                                <p>({loc.lat} , {loc.long})</p>
                                                {/* <div className="rounded mb-0" style={{height: "250px"}}>
                                                    <GoogleMap lat={loc.lat} long={loc.long} />
                                                </div> */}
                                            </div>            
                                        )})}
                                        
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )})}
                    </Accordion>
                    </Col>
                    <Col md={2} sm={12}>
                        <Button onClick={this.revert} className="revert">Revert to Locations</Button>
                    </Col>
                    </Row>
                    </Container>
                    <Nav />
                </div>
            )
        }
        
    }
}


export default Locations;