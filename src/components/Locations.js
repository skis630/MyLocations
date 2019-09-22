import React from 'react';
import $ from 'jquery';
import {Accordion, Card, Button} from 'react-bootstrap';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import TopToolbar from './toolbars/topToolbar';
import { store } from '../index';
import Nav from './toolbars/nav.jsx';
import GoogleMap from './map.jsx'
import Location from './Location.jsx';
import { sortLoc, groupByCat, deleteLoc, toggleEditLoc, editLoc } from '../actions/index';


class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.abortController = new AbortController();
        this.state = {
            locations: JSON.parse(localStorage["locations"] || "[]")
        }
        this.sortLocations = this.sortLocations.bind(this);
        this.group = this.group.bind(this);
        this.edit = this.edit.bind(this);

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

    edit(e, id) {
        e.preventDefault();
        let name = $("#edit-name").val();
        let address = $("#edit-address").val();
        let cat = $("#edit-cat").val();
        let lat = $("#edit-lat").val();
        let long = $("#edit-long").val();

        store.dispatch(editLoc(id, name, lat, long, cat, address));
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
        localStorage.setItem("locations", JSON.stringify(sorted));

    }

    group() {
        let groupedLoc = JSON.parse(localStorage["locations"] || "[]").reduce(function(groups, loc) {
            let key = 'category';
            if (groups[key] == null) groups[key] = [];
          
            groups[key].push(loc);
            return groups;
          }, {});

          store.dispatch(groupByCat(groupedLoc));
    }

    render() {
        let details ="";
        let name = "";
        if (Array.isArray(this.state.locations)) {
            return (
                <div>
                    <TopToolbar display="locations" />
                    <Accordion>
                        {this.state.locations.map((loc, index) => {
                            if (loc.editable) {
                                details = <form onSubmit={e => this.edit(e, loc.id)}>
                                            <input id="edit-address" type="text" defaultValue={loc.address} /><br />
                                            <input id="edit-lat" type="number" step="0.0000000001" defaultValue={loc.lategory} />
                                            <input id="edit-long" type="number" step="0.0000000001" defaultValue={loc.long} />
                                            <input id="edit-cat" type="text" defaultValue={loc.cat} /><br/>
                                            <Button type="submit">Save</Button> 
                                          </form>;
                                name = <input id="edit-name" type="text" defaultValue={loc.name} />

                            } else {
                                details = <div>
                                            <p>{loc.address}</p>
                                            <p><b>Coordinates:</b> ({loc.lat} , {loc.long})</p>
                                            <p><b>Category:</b> {loc.category}</p>
                                          </div>; 
                                name = loc.name;    
                            }
                            return (
                                // <Location
                                //     editable={loc.editable}
                                //     key={loc.id}
                                //     keyEvent={`${index}`}
                                //     address={loc.address}
                                //     cat={loc.category}
                                //     lat={loc.lat} long={loc.long}>
                                //     {loc.name}
                                // </Location>
                                 <Card key={loc.id}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={`${index}`}>
                                        {name}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={`${index}`}>
                                    <Card.Body>
                                        <Button onClick={() => store.dispatch(deleteLoc(loc.id))}><FaTrashAlt></FaTrashAlt> </Button>
                                        <Button onClick={() => store.dispatch(toggleEditLoc(loc.id))}> <FaEdit></FaEdit></Button><br/>
                                        {/* {loc.address}<br/>
                                        <b>Coordinates:</b> ({loc.lat},{loc.long}) <br/>
                                        <b>Category:</b> {loc.category} */}
                                        {details}
                                        <div className="rounded mb-0" style={{height: "250px"}}>
                                            <GoogleMap lat={loc.lat} long={loc.long} />
                                        </div>
                                        
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            )
                        })}
                    </Accordion>
                    {/* <ul>
                        {this.state.locations.map(loc => <li key={loc.id}>{loc.name}</li>)}
                    </ul> */}
                    <button onClick={this.sortLocations} type="button">View by alphabetical order</button>
                    <button type="button" onClick={this.group}>Group by category</button>
                    <Nav />
                </div>
            )
        } else {

            return (
                <div>
                    <TopToolbar display="locations" />
                    
                    
                </div>
            )
        }
        
    }
}


export default Locations;