import React from 'react';
import $ from 'jquery';
import {Accordion, Card, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import TopToolbar from './toolbars/topToolbar';
import { store } from '../index';
import Nav from './toolbars/nav.jsx';
import GoogleMap from './map.jsx'
import Location from './Location.jsx';
import { sortLoc, groupByCat, deleteLoc, toggleEditLoc, editLoc, revertToLocs } from '../actions/index';


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
        // localStorage.setItem("locations", JSON.stringify(sorted));

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
        let details ="";
        let name = "";
        if (Array.isArray(this.state.locations)) {
            return (
                <div>
                    <TopToolbar display="locations" />
                    <Accordion>
                        {this.state.locations.map((loc, index) => {
                            // if (loc.editable) {
                            //     details = <Form inline onSubmit={e => this.edit(e, loc.id)}>
                            //                 <FormControl id="edit-address" type="textarea" defaultValue={loc.address} required /><br />
                            //                 <InputGroup>
                            //                     <InputGroup.Prepend>
                            //                         <InputGroup.Text id="edit-addon1">(</InputGroup.Text>
                            //                     </InputGroup.Prepend>
                            //                         <FormControl id="edit-lat" type="number" step="0.0000000001" defaultValue={loc.lat} required />
                            //                     <InputGroup.Append>
                            //                         <InputGroup.Text id="basic-addon2">,</InputGroup.Text>
                            //                     </InputGroup.Append>
                            //                             <FormControl id="edit-long" type="number" step="0.0000000001" defaultValue={loc.long} required />
                            //                     <InputGroup.Append>
                            //                         <InputGroup.Text id="basic-addon2">)</InputGroup.Text>
                            //                     </InputGroup.Append>                           
                            //                 </InputGroup>
                            //                     <FormControl as="select" id="edit-cat" type="text" defaultValue={loc.cat} required >
                            //                         {JSON.parse(localStorage.categories || "[]").map(cat => <option key={cat.id}>{cat.name}</option>)}
                            //                     </FormControl>
                            //                     <br/>
                            //                     <Button type="submit">Save</Button> 
                            //               </Form>;
                            //     name = <input id="edit-name" type="text" defaultValue={loc.name} />

                            // } else {
                            //     details = <div>
                            //                 <p>{loc.address}</p>
                            //                 <p><b>Coordinates:</b> ({loc.lat} , {loc.long})</p>
                            //                 <p><b>Category:</b> {loc.category}</p>
                            //               </div>; 
                            //     name = loc.name;    
                            // }
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
                            //      <Card key={loc.id}>
                            //     <Card.Header>
                            //         <Accordion.Toggle as={Button} variant="link" eventKey={`${index}`}>
                            //             {name}
                            //         </Accordion.Toggle>
                            //     </Card.Header>
                            //     <Accordion.Collapse eventKey={`${index}`}>
                            //         <Card.Body>
                            //             <Button onClick={() => store.dispatch(deleteLoc(loc.id))}><FaTrashAlt></FaTrashAlt> </Button>
                            //             <Button onClick={() => store.dispatch(toggleEditLoc(loc.id))}> <FaEdit></FaEdit></Button><br/>
                            //             {/* {loc.address}<br/>
                            //             <b>Coordinates:</b> ({loc.lat},{loc.long}) <br/>
                            //             <b>Category:</b> {loc.category} */}
                            //             {details}
                            //             <div className="rounded mb-0" style={{height: "250px"}}>
                            //                 <GoogleMap lat={loc.lat} long={loc.long} />
                            //             </div>
                                        
                            //         </Card.Body>
                            //     </Accordion.Collapse>
                            // </Card>
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
                    <Accordion>
                        {Object.keys(this.state.locations).map((cat, index) => {
                            return (
                            // let data = this.state.locations;
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
                    <button onClick={this.revert}>Revert</button>
                    <Nav />
                </div>
            )
        }
        
    }
}


export default Locations;